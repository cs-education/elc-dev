import React from 'react';

import Terminal from './Terminal';

export default class TerminalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.updateTerm = this.updateTerm.bind(this);
  }

  updateTerm(term) {
    this.props.updateTerm(term);
  }

  render() {
    return (
      <Terminal
        width={this.props.width}
        height={this.props.height}
        updateTerm={this.updateTerm}/>
    );
  }
}
