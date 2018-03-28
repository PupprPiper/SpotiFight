import React, { Component } from "react";
import axios from "axios";

export default class LeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  async componentDidMount() {
    var data = await axios.get("http://localhost:3000/users/fetchAllUsers");
    console.log("DATA HERE ", data);
    data.data.sort((a, b) => {
      return b.wins - a.wins;
    });

    console.log("DATA HERE ", data.data);
    await this.setState({ users: data.data });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h3>LEADERBOARD</h3>
        {this.state.users ? 
        (<table align="center">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Wins</th>
              <th>Losses</th>
            </tr>
          </thead>
          <tbody>
            {console.log("INSIDE RENDER ", this.state.users)}
            {this.state.users.map((user, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <th>{user.username}</th>
                  <th>{user.wins}</th>
                  <th>{user.losses}</th>
                </tr>
              );
            })}
          </tbody>
        </table>):null
        }
      </div>
    );
  }
}
