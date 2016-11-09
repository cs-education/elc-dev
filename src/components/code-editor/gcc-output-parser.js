const gccOutputParseRe = /(.+?):\s*(.+)\s*:\s*(.+)\s*/;
const gccRowColTypeParseRe = /(\d+):(\d+):\s*(.+)/;
const gccOutputTypeTextSplitRe = /\s*(.+)\s*:\s*(.+)\s*/;
const makeOutputTypeTextSplitRe = /(.+?):(\d+):\s*(.+)/;
const makeErrorSplitRe = /make:\s\*\*\*\s*(.+)/;

const errorTypeMap = {
    gcc: 'gcc',
    cc1: 'gcc',
    collect2: 'linker',
    make: 'make',
};

class GccOutputParser {
    parse(buildOutputStr) {
        let row;
        let col;
        let buildErrorType;
        let text;
        let file;
        const errors = [];

        buildOutputStr.split('\n').forEach(errorLine => {
            const match = gccOutputParseRe.exec(errorLine);
            const makeErr = makeErrorSplitRe.exec(errorLine);

            if (match) { // two colons
                const lineColTypeMatch = gccRowColTypeParseRe.exec(match[2]);

                if (lineColTypeMatch) { // num:num: string
                    file = match[1];
                    row = parseInt(lineColTypeMatch[1], 10);
                    col = parseInt(lineColTypeMatch[2], 10);
                    const typeTextSplitMatch = gccOutputTypeTextSplitRe.exec(lineColTypeMatch[3]);
                    if (typeTextSplitMatch) {
                        buildErrorType = typeTextSplitMatch[1];
                        text = typeTextSplitMatch[2] + ': ' + match[3];
                    } else {
                        buildErrorType = lineColTypeMatch[3];
                        text = match[3];
                    }
                } else {
                    // some gcc output without line info
                    const makefileColNum = makeOutputTypeTextSplitRe.exec(match[0]);

                    if (makefileColNum) {
                        file = makefileColNum[1];
                        row = makefileColNum[2];
                        text = makefileColNum[3];
                        buildErrorType = 'error';
                    } else {
                        row = col = 0;
                        const typeTextSplitMatch = gccOutputTypeTextSplitRe.exec(match[2]);
                        if (typeTextSplitMatch) {
                            buildErrorType = typeTextSplitMatch[1];
                            text = typeTextSplitMatch[2] + ': ' + match[3];
                        } else {
                            buildErrorType = match[2];
                            text = match[3];
                        }
                    }
                }


                let mappedType = errorTypeMap[match[1]];
                if (!mappedType) mappedType = 'compile';

                errors.push({
                    row: row,
                    column: col,
                    type: mappedType,
                    buildErrorType: buildErrorType,
                    text: text,
                    file: file,
                });
            } else if (makeErr) {
                errors.push({
                    row: 0,
                    column: 0,
                    type: 'make',
                    buildErrorType: 'error',
                    text: '*** ' + makeErr[1],
                    file: undefined,
                });
            }
        });

        return errors;
    }

    // getErrorAnnotations(buildOutputStr) {
    //     let workingDir = buildOutputStr.substring(0, buildOutputStr.indexOf('\n'));
    //     if (workingDir.indexOf('/home/user') === 0) {
    //         workingDir = workingDir.substring(10, workingDir.length);
    //     } else {
    //         workingDir = '';
    //     }
    //
    //     const errors = this.parse(buildOutputStr);
    //     return errors.map((error) => {
    //         let aceAnnotationType;
    //
    //         // Determine the type of editor annotation. ace supports error, warning or info.
    //         if (error.buildErrorType.toLowerCase().indexOf('error') !== -1) {
    //             aceAnnotationType = 'error';
    //         } else if (error.buildErrorType.toLowerCase().indexOf('warning') !== -1) {
    //             aceAnnotationType = 'warning';
    //         } else {
    //             aceAnnotationType = 'info';
    //         }
    //
    //         if (typeof error.type === 'undefined') {
    //             // if the errors are not in program.c, invalidate the row and column so that
    //             // the editor does not place an annotation
    //             error.row = error.col = -1;
    //         }
    //
    //         return {
    //             // line numbers in ace start from zero
    //             workingDir: workingDir,
    //             row: error.row - 1,
    //             col: error.col,
    //             isBuildCmdError: (error.type === 'gcc') || (error.type === 'make'),
    //             type: aceAnnotationType,
    //             text: error.text,
    //             file: error.file,
    //         };
    //     });
    // }
}

export default GccOutputParser;
