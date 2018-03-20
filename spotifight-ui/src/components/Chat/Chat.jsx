import React, { Component } from "react";
import io from "socket.io-client";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Icon
} from "./../Global/Material-Globals";
import "./Chat.scss";



export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textField: "",
      messages: []
    };
  }
  componentDidUpdate(prevProps) {
    
    if (prevProps.socket !== this.props.socket) {
      !this.props.socket
        ? console.log("didnt mount")
        : this.props.socket.on("newMessage", data => {
            console.log("MESSAGED RECIEVED ", data);
            this.setState({
              messages: this.state.messages.concat([data.msg])
            });
          });
    }
  }
  handleSend() {
    this.state.textField
      ? this.props.socket.emit("send message", this.state.textField)
      : console.log("text field empty");
    this.setState({ textField: "" });
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
          
        
      </div>
    );
  }
}
