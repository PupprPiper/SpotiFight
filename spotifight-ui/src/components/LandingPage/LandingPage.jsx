import React, { Component } from 'react';
import Verify from '../Auth/Verify.jsx';

export default class LandingPage extends Component {
  render() {
    return (<div>
    Hello from Landing Page
      <Verify history={this.props.history}  />
    </div>)
  }
}
