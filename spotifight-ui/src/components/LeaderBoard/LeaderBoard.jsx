import React, { Component } from 'react';
import Verify from '../Auth/Verify.jsx'
import axios from "axios";
import Table from './Table.jsx';
import './LeaderBoard.scss';

export default class LeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  async componentDidMount() {
    var data = await axios.get("http://localhost:3000/users/fetchAllUsers");
    data.data.sort((a, b) => {
      return b.wins - a.wins;
    });

    await this.setState({ users: data.data });
  }

  render() {
    return (
      <div>
        <Table/>

              <Verify history={this.props.history}  />
      </div>
    );
  }
}
