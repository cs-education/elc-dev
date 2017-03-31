import React from 'react';

import CompilerButtons from './compiler-buttons';
import Stdin from './stdin';

export default class CompilerControls extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    this.props.onSubmit();
  }

  handleQuit = () => {
    this.props.handleQuit();
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
          handleSubmit={this.handleSubmit}
          handleQuit={this.handleQuit}
          copyToClipboard={this.copyToClipboard}
          reset={this.props.reset} />
        <Stdin
          sendInput={this.sendInput} />
      </div>
    );
  }
}
