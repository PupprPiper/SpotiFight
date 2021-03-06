import React, { Component } from "react";
import "./rpsls.scss";
import axios from "axios";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import { connect } from 'react-redux';
class rpsls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: ["rock", "paper", "scissors", "lizard", "spock"],
      outcome: {
        scissorspaper: "WIN!",
        paperrock: "WIN!",
        rocklizard: "WIN!",
        lizardspock: "WIN!",
        spockscissors: "WIN!",
        scissorslizard: "WIN!",
        lizardpaper: "WIN!",
        paperspock: "WIN!",
        spockrock: "WIN!",
        rockscissors: "WIN!",
        paperscissors: "LOSE!",
        rockpaper: "LOSE!",
        lizardrock: "LOSE!",
        spocklizard: "LOSE!",
        scissorsspock: "LOSE!",
        lizardscissors: "LOSE!",
        paperlizard: "LOSE!",
        spockpaper: "LOSE!",
        rockspock: "LOSE!",
        scissorsrock: "LOSE!"
      },
      images: {
        rock: "https://i.imgur.com/zmLVJZp.png",
        paper: "https://i.imgur.com/ybk2XTA.png",
        scissors: "https://i.imgur.com/sJs4NvB.png",
        lizard: "https://i.imgur.com/eKh70tA.png",
        spock: "https://i.imgur.com/XftFR1M.png"
      },
      players: this.props.players,
      userChoice: null,
      opp: null,
      oppChoice: null,
      result: null,
      winner: null,
      tie: false
    };
    this.makeChoice = this.makeChoice.bind(this);
  }
  componentDidMount() {
    this.props.socket.on("oppChoice", data => {
      if (data.user !== this.props.localUser) {
        this.setState({ opp: data.user, oppChoice: data.choice });
      }
      this.checkWin();
    });
    this.props.socket.once("final", data => {
      this.setState({ result: "END", winner: data });
      if (this.props.localUser === this.props.host) {
        this.props.players.forEach(player => {
          if (player.username !== this.state.winner) {
            axios.put("/users/addWinLoss", {
              field: "losses",
              user_id: player.id
            });
          } else {
            axios.put("/users/addWinLoss", {
              field: "wins",
              user_id: player.id
            });
          }
        });
      }
    });
    this.props.socket.on("restart", () => {
      this.setState({ userChoice: null, oppChoice: null });
    });
  }

  async makeChoice(i) {
    if (this.state.result !== "END") {
      this.setState({ userChoice: this.state.choices[i] });
      this.props.socket.emit("makeChoice", {
        user: this.props.localUser,
        choice: this.state.choices[i]
      });
    }
  }

  checkWin() {
    var result = this.state.userChoice + this.state.oppChoice;
    console.log("RESULT HERE ", result);

    if (
      this.state.userChoice &&
      this.state.oppChoice &&
      this.state.result !== "END"
    ) {
      if (this.state.userChoice === this.state.oppChoice) {
        this.setState({ result: "TIE" });
        result = null;
        //this is so we can show the choices made for a second before resetting
        setTimeout(() => {
          this.setState({
            result: null,
            userChoice: null,
            oppChoice: null
          });
        }, 1000)
      } else if (this.state.outcome[result] === "WIN!") {
        this.props.socket.emit("winner", this.props.localUser);
        console.log(this.props.mySong)
        this.props.socket.emit('SEND_WINNER_SONG', this.props.mySong);
        
      }
    }
  }

  render(props) {
    return (
      <div>
        {this.state.result === "TIE" ? (
          <h3 style={{textAlign: 'center', fontSize: '40px'}}>TIE! Go again </h3>
        ) : this.state.result === "END" ? (
          <h1 style={{textAlign: 'center', fontSize: '40px'}}>{this.state.winner} WINS! </h1>
        ) : null}
        <div />
        <Grid container spacing={24}>
          {this.state.players.map((player, i) => {
            return (
              <Grid align="center" key={i} item xs={6}>
                <Paper style={{ minWidth: "110px", maxWidth: "300px", marginTop: "1%"}}>
                  <img src={player.avatar_url} className="buttonCard" />
                  <p>{player.username}</p>

                  {this.state.result === "END" ? 
                  player.username === this.props.localUser ?
                  <img src={this.state.images[this.state.userChoice]} />:
                  <img src={this.state.images[this.state.oppChoice]} />
                  : null}

                  {this.state.result === "TIE" ? (
                    i === 0 ? (
                      <img src={this.state.images[this.state.userChoice]} />
                    ) : (
                      <img src={this.state.images[this.state.oppChoice]} />
                    )
                  ) : null}
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <div align="center">
          {this.state.choices.map((choice, i) => {
            return (
              <img
                className="choices"
                key={i}
                index={i}
                onClick={() => this.makeChoice(i)}
                src={this.state.images[choice]}
                alt={choice}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    mySong: state.mySong
  };
};

export default connect(mapStateToProps)(rpsls);