import React, { Component } from 'react';
import axios from "axios";

class Table extends React.Component {
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
  
  render () {
    return (
      <div className="leaderboard-table">
      <h3 className="leaderboard-head"> LEADERBOARD </h3>
        <table style={{ width: "100%" }}>
        <thead>
        <tr>
          <th>Rank</th>
          <th>Avatar</th>
          <th>Username</th>
          <th>Wins</th>
          <th>Losses</th>
        </tr>
      </thead>
          <tbody>
          {this.state.users?(
            this.state.users.map((user, i) => 
            (
              <tr key={i}>
                <td>{i + 1}</td>
                <td><img src={user.avatar_url} alt="avatar" width="50" height="50" className="table-img"/></td>
                <td>{user.username}</td>
                <td>{user.wins}</td>
                <td>{user.losses}</td>
              </tr>
            )
            )
        ):null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;