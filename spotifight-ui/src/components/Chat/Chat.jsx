import React, { Component } from 'react';
import io from 'socket.io-client';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Icon
} from './../Global/Material-Globals';
import './Chat.scss';

let socket = io.connect('http://localhost:8000', {query: {
  roomName: 'test'
}});

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      textField: '',
      messages: []
    };
  }

  componentDidMount() {
    socket.on('new message', data => {
      console.log('MESSAGED RECIEVED ', data)
      this.setState({
        messages: this.state.messages.concat([data.msg])
      });
    });
  }

  handleSend() {
    this.state.textField
      ? socket.emit('send message', this.state.textField)
      : console.log('text field empty');
    this.setState({ textField: '' });
  }

  setTextField(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  render() {
    return (
      <div className="chat">
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <Paper>users go here</Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <div>
              {this.state.messages.map((message, index) => {
                return <Paper key={index}>{message}</Paper>;
              })}
            </div>
            <TextField
              className="text-field"
              label="message"
              placeholder="enter message"
              multiline
              margin="normal"
              name="textField"
              value={this.state.textField}
              onChange={e => this.setTextField(e)}
            />
            <Button onClick={() => this.handleSend()}>send</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
