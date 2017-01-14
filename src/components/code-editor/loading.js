import React from 'react';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dots: '' };
  }

  componentDidMount() {
    let id = setInterval(() => this.update(), 500);
    this.props.setLoad(id);
  }

  update() {
    this.setState((prevState, props) => {
      if (prevState.dots.length === 3) {
        return { dots: '' };
      } else {
        return { dots: prevState + '.' };
      }
    });
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
