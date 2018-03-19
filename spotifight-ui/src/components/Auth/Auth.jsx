import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import './Auth.scss';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {top: `${top}%`, left: `${left}%`, transform: `translate(-${top}%, -${left}%)`};
}

const textStyles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: ".5em",
    marginRight: ".5em",
    width: 200,
  },
  menu: {
    width: 200,
  },
};

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '30%',
    height: '20%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: 'block',
  }
});

class Auth extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      email: '',
      password: '',
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  };

  componentDidMount() {

    this.handleOpen();

  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    const {classes} = this.props;

    return (<div>

      <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.open} onClose={this.handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="title" id="modal-title">
            Login
          </Typography>
          <TextField id="email" label="Email" className={'email-field'} style={textStyles.textField} value={this.state.email} onChange={(e) => this.handleEmailChange(e)} margin="normal"/>

        <TextField id="password" label="Password" className={'password-field'} value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} margin="normal"/>

          <Typography variant="subheading" id="simple-modal-description">
            Don't have an account?
          </Typography>

        </div>
      </Modal>
    </div>);
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const AuthWrapped = withStyles(styles)(Auth);

export default AuthWrapped;
