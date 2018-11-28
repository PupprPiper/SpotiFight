import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/Dialog';

class AlertDialog extends React.Component {
  constructor(){
    super()
    this.state = {
      open: false,
      alert: null
    };
  }
  componentDidMount(){
 
    this.setState({ open: true });
  }
  handleClickOpen(){
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
 
    
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={()=>this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"WARNING: SONG WILL NOT BE PLAYED"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
Spotify does not have a a preview url for this song. Please choose another song
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() =>this.handleClose()} color="secondary">
              Agree
            </Button>
            <Button onClick={()=>this.handleClose()} color="primary">
            Agree but in blue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;