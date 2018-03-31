import React, {Component} from 'react';
import {
  Button,
  TextField
} from './../Global/Material-Globals';

class SongSearch extends Component {
constructor(props) {
  super(props)
  this.state = {
    textField: ''
  }
}  

  setTextField(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  render() {
      return  (
  <div>
     <div align="center">
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
        </div>
        <div align="center">
          <Button type="submit" onClick={() => this.props.handleSend()}>
            send message
          </Button>
        </div>
  </div>
    )
  }
}

export default SongSearch;