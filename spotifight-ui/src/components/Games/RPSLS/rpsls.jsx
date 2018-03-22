import React, { Component } from "react";
import './rpsls.scss';
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
        rock: 'https://i.imgur.com/z8yK0Q4.jpg',
        paper: 'https://i.imgur.com/wXq7nj8.jpg',
        scissors: 'https://i.imgur.com/jljkva5.jpg',
        lizard: 'https://i.imgur.com/6ix7L4A.jpg',
        spock: 'https://i.imgur.com/sRHZvfq.jpg'

      },
      opponentChoice: null,
      madeChoice: false,
      result: null,
      ended: false,
      localUser: this.props.localUser,
      players: this.props.players,
      socketID: this.props.socketID,
      socket: this.props.socket,
      winner: null
    };
    this.makeChoice = this.makeChoice.bind(this);
  }
  componentDidMount() {
    this.state.socket.on('receiveWinner', data => {
      this.setState({winner: data})
    })
    this.setState({opponentChoice: this.state.choices[Math.floor(Math.random() * 5 + 1)]})
  }

  async makeChoice(i) {
    console.log('yours ',this.state.choices[i], 'opponent ', this.state.opponentChoice)
    var result = this.state.choices[i] + this.state.opponentChoice;
    if(!this.state.ended){
      if(!this.state.outcome[result]){
        console.log('TIE!')
        this.setState({opponentChoice: this.state.choices[Math.floor(Math.random() * 5 + 1)]})
      }else{
        console.log(this.state.outcome[result])
        await this.setState({ended: true,
        result: this.state.outcome[result]})
      }
    }else{
      console.log('THE GAME ALREADY ENDED')
    }
    console.log('RESULT OF GAME HERE ',this.state.result)
    if(this.state.result === 'WIN!'){
      console.log('GETS TO BROADCAST WINNER')
      this.state.socket.emit("broadcastWinner", this.state.localUser)
    }
  }

  render(props) {
    return (
      <div>
        <div>
          {console.log('HERE IS THE FINAL WINNER ', this.state.winner)}
          {console.log(this.state.opponentChoice)}
          {this.state.ended ? <h3>YOU {this.state.result}</h3> : null}
        </div>
        <div>
        {this.state.choices.map((choice, i) => {
          return (
            <img className="choices" key={i} index={i} onClick={() => this.makeChoice(i)} src={this.state.images[choice]} alt={choice}/>
          );
        })}
        </div>
      </div>
    );
  }
}
