import React from 'react';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dots: '' };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    let id = setInterval(() => this.update(), 500);
    this.props.setLoad(id);
  }

  update() {
    let dots = this.state.dots;
    if (dots.length === 3) {
      dots = '';
    } else {
      dots += '.';
    }
    this.state = { dots: dots };
    this.forceUpdate();
  }

  render() {
    let text = "Compiler loading" + this.state.dots;
    return (
      <div className="loading">
        {text}
      </div>
    );
  }
}
