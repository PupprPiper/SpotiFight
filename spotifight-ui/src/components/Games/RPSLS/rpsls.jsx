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
    };
    this.makeChoice = this.makeChoice.bind(this);
  }
  componentDidMount() {
    this.setState({opponentChoice: this.state.choices[Math.floor(Math.random() * 5 + 1)]})
  }

  makeChoice(i) {
    console.log('yours ',this.state.choices[i], 'opponent ', this.state.opponentChoice)
    var result = this.state.choices[i] + this.state.opponentChoice;
    console.log('HERE IS THE RESULT ', result)
    if(!this.state.outcome[result]){
      console.log('TIE!')
      this.setState({opponentChoice: this.state.choices[Math.floor(Math.random() * 5 + 1)]})
    }else{
      console.log(this.state.outcome[result])
      this.setState({ended: true,
      result: this.state.outcome[result]})
    }
  }

  render(props) {
    return (
      <div>
        <div>
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
