import React from 'react';

export default class Stdin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ input: e.target.value });
  }

  handleSubmit = (e) => {
    console.log(this.state.input);
    e.preventDefault();
    this.props.sendInput(this.state.input + '\n');
  }

  render() {
    return (
      <div className="stdin">
        <form>
          stdin: <input type="text" onChange={this.handleChange} name="stdin" />
          <input type="submit" value="Send" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}
