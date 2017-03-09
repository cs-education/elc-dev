import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/theme/github';

import CompilerControls from '../compiler-controls';
import Output from './output';
import { gccParseable, getErrors } from './gcc-output-parser';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);

    let language = 'c_cpp';
    if (this.props.language) {
      language = this.props.language;
    }

    this.state = {
      text: this.props.text,
      term: this.props.term,
			toggled: false,
      childOutput: '',
      language: language,
      annotations: [],
      outputToggled: false
    };
  }

  handleChange = (newValue) => {
    this.setState({ text: newValue });
  }

  addCompilingLabel = () => {
    if (!this.state.outputToggled) {
      this.setState({ outputToggled: true });
    }
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
    this.setState({ outputToggled: false });
    this.setState({ childOutput: '' });
  }

  handleCppCompile = () => {
    this.setState({ annotations: null });
    this.state.output = '';

    this.state.term.terms[0].SetCharReceiveListener(c => {
      this.setState((prevState, props) => {
        return { output: prevState.output + c };
      });

      let output = this.state.output;
      let regexMatchArr = gccParseable(output);
      if (regexMatchArr) {
        let result = getErrors(regexMatchArr);
        let errors = result.errors;
        let errorAnnotations = result.errorAnnotations;

        if (errors.length > 0) {
          errors.forEach(e => this.addOutputToDoc(
            'ERROR: ' + e.text + ' at line ' + e.row + ' column ' + e.column
          ));
          this.setState({ annotations: errorAnnotations });
        } else {
          this.addOutputToDoc(regexMatchArr[3]);
        }

        this.state.output = '';
      }
    });

    let buf = new Buffer(this.state.text);
    let jor1kFS = this.state.term.fs;

    jor1kFS.MergeBinaryFile('home/user/main.c', buf);
    this.addCompilingLabel();

    const compileCmd = 'clear && gcc -std=c99 main.c -o main\n';
    const fullCmd = 'echo \\#\\#\\#GCC_COMPILE\\#\\#\\#;clear;pwd;' + compileCmd + ' echo GCC_EXIT_CODE: $?; echo \\#\\#\\#GCC_COMPILE_FINISHED\\#\\#\\#\n' + 'clear && ./main\n';

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

    jor1kFS.MergeBinaryFile('home/user/main.py', buf);
    this.addCompilingLabel();

    const compileCmd = 'python main.py\necho $?\n'
    const data = compileCmd.split('').map(c => c.charCodeAt(0) >>> 0);

    this.state.term.message.Send('tty0', data);
  }

  handleSubmission = () => {
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

  copyToClipboard = () => {
    let editor = brace.edit(this.props.id);
    editor.selection.selectAll();
    let text = editor.getSelectedText();
    try {
      let successful = document.execCommand('copy');
      let msg = successful ? 'successful' : 'unsuccessful';
      alert('Copy was ' + msg);
    } catch (e) {
      console.error('Unable to copy to cliboard', e);
    }
    editor.selection.clearSelection();
  }

  sendInput = (input) => {
    const data = input.split('').map(c => c.charCodeAt(0) >>> 0);
    this.state.term.message.Send('tty0', data);
  }

  render() {
    return (
      <div className="editor">
        <div className="code-editor">
          <AceEditor
            name={this.props.id}
            mode={this.state.language}
            theme="github"
            height={this.props.height}
            width={this.props.width}
            onChange={this.handleChange}
            value={this.state.text}
  					readOnly={!this.state.toggled}
            annotations={this.state.annotations} />
        </div>
        { this.state.outputToggled ?
          <Output
            output={this.state.childOutput}
            toggleClear={this.toggleClear} /> : null }
        <CompilerControls
          editor={this.props.id}
          onSubmit={this.handleSubmission}
					toggleEdit={this.toggleEdit}
          handleQuit={this.handleQuit}
          clearOutput={this.clearChildOutput}
          copyToClipboard={this.copyToClipboard}
          sendInput={this.sendInput} />
      </div>
    );
  }
}
