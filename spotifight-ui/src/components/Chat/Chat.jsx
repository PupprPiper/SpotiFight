import React, { Component } from 'react';
import { Button, TextField } from './../Global/Material-Globals';
import Grid from 'material-ui/Grid';

export default class Chat extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <TextField
            hintText="message field"
            floatingLabelText="enter message"
            multiLine={true}
            rows={2}
          />
          <Button
            label="send"
            secondary={true}
            onClick={() => console.log('test')}
          />
        </Grid>
        <Grid container spacing={24}>
          Yo
        </Grid>
      </div>
    );
  }
}
