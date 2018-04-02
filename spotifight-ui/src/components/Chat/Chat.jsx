import React, { Component } from "react";
import io from "socket.io-client";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Icon,
  List
} from "./../Global/Material-Globals";
import "./Chat.scss";
import Verify from '../Auth/Verify.jsx';
import { withStyles } from 'material-ui/styles';
import $ from 'jquery'
const style ={
  chatList: {
    overflow: 'auto',
    maxHeight: 200,
    maxWidth: 700,
    height: 200


  }
}

class Chat extends Component {
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
            $(".scrollBottom").animate({ scrollTop: $(document).height() }, "slow");
            return false;
          });
    }
  }

  componentDidMount(){
    if(this.props.socket !== null){
    this.props.socket.on("newMessage", data => {
      console.log("MESSAGED RECIEVED ", data);
      this.setState({
        messages: this.state.messages.concat([data.msg])
      });
      
    });
  }
  }
  handleSend() {
    this.props.socket.emit("CHAT_USER", this.props.localUser)
    this.state.textField
      ? this.props.socket.emit("send message", this.state.textField)
      : console.log("text field empty");
    this.setState({ textField: "" });
    $(".scrollBottom").animate({ scrollTop: $(document).height() }, "slow");
      return false;

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




            <List className = {`scrollBottom ${this.props.classes.chatList}`}>
              {this.state.messages.map((message, index) => {
                return <Paper key={index}>{message}</Paper>;
              })}
            </List>
            <div align = 'center'>
            <TextField
              className="text-field"
              label="message"
              placeholder="enter message"
              multiline
              margin="normal"
              name="textField"
              value={this.state.textField}
              onChange={e => this.setTextField(e)}
              onKeyPress={(ev) => {

                if (ev.key === 'Enter') {
                  this.handleSend()
                  ev.preventDefault();
                }
              }}
            />
            </div>
            <div align = 'center'>
            <Button type = 'submit' onClick={() => this.handleSend()}>send message</Button>
            </div>
            <Verify history={this.props.history}  />

      </div>
    );
  }
}

export default withStyles(style)(Chat)