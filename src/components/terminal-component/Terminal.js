import React from 'react';

import Jor1kSetup from './jor1k-setup';

export default class Terminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { output: '' };
  }

  componentDidMount() {
    let jor1k = Jor1kSetup();
    jor1k.terms[0].SetCharReceiveListener(c => {
      this.state.output += c;
      if (this.state.output.indexOf('~ $') > -1) {
        alert("COMPILER READY!");
        this.state.output = '';
        this.props.updateTerm(jor1k);
      }
    });
  }

  render() {
    return (
      <div id="term">
        <canvas
          id="tty0"
          width={this.props.width}
          height={this.props.height} >
        </canvas>
      </div>
    );
  }
}
