import React from 'react';

import CompilerButtons from './compiler-buttons';
import Stdin from './stdin';

export default class CompilerControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = { toggled: false };
  }

  handleSubmit = () => {
    this.props.onSubmit();
  }

  handleEdit = () => {
    this.props.toggleEdit();
    this.setState((prevState, props) => {
      return { toggled: !prevState.toggled };
    });
  }

  handleQuit = () => {
    this.props.handleQuit();
  }

  clearOutput = () => {
    this.props.clearOutput();
  }

  copyToClipboard = () => {
    this.props.copyToClipboard();
  }

  sendInput = (input) => {
    this.props.sendInput(input);
  }

  render() {
    return (
      <div className="compiler-controls">
        <CompilerButtons
          editor={this.props.editor}
          handleEdit={this.handleEdit}
          toggled={this.state.toggled}
          handleSubmit={this.handleSubmit}
          handleQuit={this.handleQuit}
          clearOutput={this.clearOutput}
          copyToClipboard={this.copyToClipboard} />
        <Stdin
          sendInput={this.sendInput} />
      </div>
    );
  }
}
