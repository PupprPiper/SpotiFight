import React, { Component } from "react";
import "./rpsls.scss";
import axios from 'axios';
export default class rpsls extends Component {
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
        rock: "https://i.imgur.com/z8yK0Q4.jpg",
        paper: "https://i.imgur.com/wXq7nj8.jpg",
        scissors: "https://i.imgur.com/jljkva5.jpg",
        lizard: "https://i.imgur.com/6ix7L4A.jpg",
        spock: "https://i.imgur.com/sRHZvfq.jpg"
      },
      players: this.props.players,
      userChoice: null,
      opp: null,
      oppChoice: null,
      result: null,
      winner: null
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
    this.props.socket.on('final', (data) => {
      this.setState({result: 'END', winner: data});
      if(this.props.localUser === this.props.host){
        this.props.players.forEach((player => {
          if(player.username !== this.state.winner){
            console.log('GETS HERE')
            axios.put('http://localhost:3000/users/addWinLoss', {field: 'losses', user_id: player.id })
          }else{
            axios.put('http://localhost:3000/users/addWinLoss', {field: 'wins', user_id: player.id })
          }
        }))
      }
    });
    this.props.socket.on('restart', () => {
      this.setState({userChoice: null, oppChoice: null})
    })
  }

  async makeChoice(i) {
    if(this.state.result !== 'END'){
      this.setState({userChoice: this.state.choices[i]})
      this.props.socket.emit("makeChoice", {
        user: this.props.localUser,
        choice: this.state.choices[i]
      });
    }
  }

  checkWin () {
    var result = this.state.userChoice + this.state.oppChoice;
    console.log('RESULT HERE ', result)

    if(this.state.userChoice && this.state.oppChoice && this.state.result !== 'END'){
      if(this.state.userChoice === this.state.oppChoice){
        this.setState({result: 'TIE', userChoice: null, oppChoice: null})
        result = null;
      }else if(this.state.outcome[result] === 'WIN!'){
        this.props.socket.emit('winner', this.props.localUser)
      }

    }
  }

  render(props) {
    return (
      <div>
        {this.state.result === 'TIE' ? <h3>TIE! Go again </h3> 
        : this.state.result === 'END' ? <h3>{this.state.winner} WINS! </h3>
        : null}
      <div/>
        <div>
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
