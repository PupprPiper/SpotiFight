import React, { Component } from 'react';

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 5
    };
  }

  componentDidMount() {
    console.log('props-->', this.props);
    let id = setInterval(() => {
      this.setState({ timer: (this.state.timer -= 1) });
      if (this.state.timer === 0) {
        clearInterval(id);
        this.props.history.push(
          `/game-room/${this.props.location.state.roomId}`
        );
      }
    }, 1000);
  }

  render() {
    return (
      <div
        style={{
          fontSize: '6em'
        }}
      >
        {this.state.timer}
      </div>
    );
  }
}

export default CountDown;
