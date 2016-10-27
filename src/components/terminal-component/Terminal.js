import React from 'react';

import setup from './jor1k-setup';

export default class Terminal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let jor1k = setup.initialize();
    this.props.updateTerm(jor1k);
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
