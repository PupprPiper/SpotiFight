import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Icon
} from './../Global/Material-Globals';
import './Chat.scss';
import Verify from '../Auth/Verify';
import SongSearch from './songSearch';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textField: '',
      userPayloads: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.socket !== this.props.socket) {
      !this.props.socket
        ? console.log('didnt mount')
        : this.props.socket.on('newMessage', data => {
            this.setState({
              userPayloads: this.state.userPayloads.concat([data])
            });
          });
      }
  }

  setTextField(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  handleSend() {
    // this.props.socket.emit('CHAT_USER', this.props.userProfile);
    this.state.textField
      ? this.props.socket.emit('send message', {
          username: this.props.userProfile.username,
          avatar_url: this.props.userProfile.avatar_url,
          msg: this.state.textField
        })
      : console.log('text field empty');
    this.setState({ textField: '' });
  }

  render() {
    return (
      <div className="box-content">
        {this.state.userPayloads.map((user, i) => {
          console.log('user--->', user)
          return (
            <article key={i} className="post">
              <div className="media">
                <div className="media-left">
                  <p className="image is-32x32">
                    <img src={user.avatar_url} />
                  </p>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p><a>{user.username}</a> {user.msg} &nbsp;</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

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

        {/* <SongSearch handleSend={this.handleSend} /> */}
        <Verify history={this.props.history} />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    socket: state.socket
  };
};

export default connect(mapStateToProps)(Chat);
