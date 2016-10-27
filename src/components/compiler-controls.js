import React from 'react';

export default class CompilerControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  handleEdit(e) {
    e.preventDefault();
    this.props.toggleEdit();
    this.state = {
        toggled: !this.state.toggled
    };
    this.forceUpdate();
  }

  handleQuit(e) {
    e.preventDefault();
    this.props.handleQuit();
  }

  render() {
    return (
      <div className="compiler-controls">
        <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={this.handleEdit}>{ this.state.toggled ? 'Lock Text' : 'Edit'}</button>
        <button onClick={this.handleQuit}>Quit Program</button> </div>
    );
  }
}
