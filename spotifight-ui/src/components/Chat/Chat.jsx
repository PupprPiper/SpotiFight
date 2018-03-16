import React, { Component } from 'react';
import { Button } from './../Global/Button/button';

export default class Chat extends Component {
  render() {
    return (
      <div>
        Hello from Chat
        <Button label="test" onClick={() => console.log('test')} />
      </div>
    );
  }
}
