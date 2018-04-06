import React from 'react';
import Dialog from 'material-ui/Dialog';
import { Button } from './../Global/Material-Globals';
import './UserProfile.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeCurrentUser } from './../../actions/index';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class ProfileUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      usernameInput: '',
      avatarInput: '',
      statusInput: ''
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  async updateInfo() {
    if (this.state.usernameInput) {
      await axios.put('/users/updateInfo', {
        field: 'username',
        info: this.state.usernameInput,
        user_id: this.props.userProfile.id
      });
    }
    if (this.state.avatarInput) {
      await axios.put('/users/updateInfo', {
        field: 'avatar_url',
        info: this.state.avatarInput,
        user_id: this.props.userProfile.id
      });
    }
    if (this.state.statusInput) {
      await axios.put('/users/updateInfo', {
        field: 'status',
        info: this.state.statusInput,
        user_id: this.props.userProfile.id
      });
    }

    await this.setState({
      usernameInput: '',
      avatarInput: '',
      statusInput: ''
    });
  }

  setTextField(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  render() {
    const actions = [
      <Button label="Cancel" primary={true} onClick={this.handleClose} />,
      <Button
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <Button
          variant="raised"
          color="primary"
          className="primary"
          label="Dialog"
          onClick={this.handleOpen}
        >
          {' '}
          Update Info{' '}
        </Button>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal="false"
          open={this.state.open}
          onBackdropClick={this.handleClose}
        >
          <div className="content user-modal">
            <h3>Username</h3>
            <div className="field">
              <div className="control">
                <input
                  type="text"
                  className="input is-medium"
                  name="usernameInput"
                  value={this.state.usernameInput}
                  onChange={e => this.setTextField(e)}
                />
              </div>
            </div>

            <h3> Avatar </h3>

            <div className="field">
              <div className="control">
                <input
                  type="text"
                  name="avatarInput"
                  className="input is-medium"
                  value={this.state.avatarInput}
                  onChange={e => this.setTextField(e)}
                />
              </div>
            </div>

            <h3> Status </h3>

            <div className="field">
              <div className="control">
                <input
                  type="text"
                  name="statusInput"
                  className="input is-medium"
                  value={this.state.statusInput}
                  onChange={e => this.setTextField(e)}
                />
              </div>
            </div>

            <Button
              align="center"
              variant="raised"
              color="primary"
              className="primary"
              onClick={() => {
                this.updateInfo();
                this.props.weUpdated(this.props.userProfile.email);
                this.handleClose();
              }}
            >
              Save
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userProfile: state.userProfile };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      storeCurrentUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
