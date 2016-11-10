import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import $ from 'jquery';

import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/theme/github';

import CompilerControls from '../compiler-controls';
import Output from '../output-component';
import GccOutputParser from './gcc-output-parser';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text,
      term: this.props.term,
			toggled: false,
      childOutput: '',
      language: 'c_cpp',
      annotations: [],
      clearOutput: false,
      filename: 'main.c'
    };
  }

  handleChange = (newValue) => {
    this.setState({ text: newValue });
  }

  addCompilingLabel = () => {
    let compileLabel = '\nCompiling main...\n';
    this.setState((prevState, props) => {
      return { childOutput: prevState.childOutput + compileLabel };
    });
  }

  addOutputToDoc = (output) => {
    let text = '\nPROGRAM OUTPUT:\n\n';
    text += output + '\n';

    this.setState((prevState, props) => {
      return { childOutput: prevState.childOutput + text };
    });
  }

  clearChildOutput = () => {
    this.setState({ childOutput: '' });
  }

  handleCppCompile = () => {
    let gccOutputCaptureRe = /###GCC_COMPILE###\s*([\S\s]*?)\s*###GCC_COMPILE_FINISHED###\s*((.|\n)*)\s*echo \$\?/;
    let gccExitCodeCaptureRe = /GCC_EXIT_CODE: (\d+)/;

    this.state.term.terms[0].SetCharReceiveListener(c => {
      this.state.output += c;
      const regexMatchArr = gccOutputCaptureRe.exec(this.state.output);
      if (regexMatchArr) {
        const gccOutput = regexMatchArr[1];
        let parser = new GccOutputParser();
        const gccExitCode = parseInt(gccExitCodeCaptureRe.exec(gccOutput)[1], 10);
        const errors = parser.parse(gccOutput);
        const errorAnnotations = parser.getErrorAnnotations(gccOutput);

        let result = {
          exitCode: gccExitCode,
          annotations: errors,
          gccOutput: gccOutput,
          total: regexMatchArr
        };

        if (errors.length > 0) {
          errors.forEach(e => this.addOutputToDoc(
            'ERROR: ' + e.text + ' at line ' + e.row + ' column ' + e.column
          ));
          this.setState({ annotations: errorAnnotations });
        } else {
          this.addOutputToDoc(regexMatchArr[2]);
        }

        this.state.output = '';
      }
    });

    let buf = new Buffer(this.state.text);
    let jor1kFS = this.state.term.fs;

    jor1kFS.MergeBinaryFile(`home/user/${this.state.filename}.c`, buf);
    this.addCompilingLabel();

    const compileCmd = `clear && gcc -std=c99 ${this.state.filename}.c -o ${this.state.filename}\n`;
    const fullCmd = 'echo \\#\\#\\#GCC_COMPILE\\#\\#\\#;clear;pwd;' + compileCmd + ' echo GCC_EXIT_CODE: $?; echo \\#\\#\\#GCC_COMPILE_FINISHED\\#\\#\\#\n' + `clear && ./${this.state.filename}\n\necho $?\n`;

    const data = fullCmd.split('').map(c => c.charCodeAt(0) >>> 0);

    this.state.term.message.Send('tty0', data);
  }

  handlePythonCompile = () => {
    this.state.term.terms[0].SetCharReceiveListener(c => {
      this.state.output += c;
      if (this.state.output.split('\n').indexOf('~ $ echo $?') > 0) {
        this.addOutputToDoc(this.state.output);
        this.state.output = '';
      }
    });

    let buf = new Buffer(this.state.text);
    let jor1kFS = this.state.term.fs;

    jor1kFS.MergeBinaryFile(`home/user/${this.state.filename}.py`, buf);
    this.addCompilingLabel();

    const compileCmd = `python ${this.state.filename}.py\necho $?\n`
    const data = compileCmd.split('').map(c => c.charCodeAt(0) >>> 0);

    this.state.term.message.Send('tty0', data);
  }

  handleSubmission = () => {
    if (this.state.clearOutput) {
      this.clearChildOutput();
    }

    if (this.state.language === 'c_cpp') {
      this.handleCppCompile();
    } else {
      this.handlePythonCompile();
    }
  }

	toggleEdit = () => {
		this.setState((prevState, props) => {
      return { toggled: !prevState.toggled };
    });
	}

  handleQuit = () => {
    let quitCmd = '\x03';
    const data = quitCmd.split('').map(c => c.charCodeAt(0) >>> 0);
    this.state.term.message.Send('tty0', data);
  }

  handleLanguageChange = (newLanguage) => {
      this.setState({ language: newLanguage });
  }

  toggleClear = () => {
    this.setState((prevState, props) => {
      return { clearOutput: !prevState.clearOutput };
    });
  }

  handleFileChange = (newFileName) => {
    this.setState({ filename: newFileName });
  }

  render() {
    return (
      <div className="editor">
        <div className="code-editor">
          <AceEditor
            name={this.props.id}
            mode={this.state.language}
            theme="monokai"
            height={this.props.height}
            width={this.props.width}
            onChange={this.handleChange}
            value={this.state.text}
  					readOnly={!this.state.toggled}
            annotations={this.state.annotations} />
        </div>
        <Output
          output={this.state.childOutput}
          toggleClear={this.toggleClear} />
        <CompilerControls
          onSubmit={this.handleSubmission}
					toggleEdit={this.toggleEdit}
          handleQuit={this.handleQuit}
          handleLanguageChange={this.handleLanguageChange}
          handleFileChange={this.handleFileChange} />
      </div>
    );
  }
}

// COMPLETED
// python support
// filename editing
// packaging
// clear / append

// TODO

// simple-ish stuff ----
// user input
// copy to clipboard
// skipping boilerplate & adding on edit&go
// - preamble, postamble etc.
// - live code attributes
// filename & contents
// multiple submits from different blocks


// hardcore stuff ----
// reduce preconfigured ram for jor1k
// kill if hardware slow (running on phone)
// fix web worker
// auto check for syntax

// paper stuff ----
// gitbook
// user studies
