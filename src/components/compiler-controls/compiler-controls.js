import React from 'react';

import LanguageSelection from './language-selection';
import CompilerButtons from './compiler-buttons';

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

  handleLanguageChange = (newLanguage) => {
    this.props.handleLanguageChange(newLanguage);
  }

  render() {
    return (
      <div className="compiler-controls">
        <CompilerButtons
          handleEdit={this.handleEdit}
          toggled={this.state.toggled}
          handleSubmit={this.handleSubmit}
          handleQuit={this.handleQuit} />
        <LanguageSelection
          handleLanguageChange={this.handleLanguageChange} />
      </div>
    );
  }
}
