import React, { Component } from "react";

export default class rpsls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: ["rock", "paper", "scissors", "lizard", "spock"],
      outcome: {
        scissorspaper: "win",
        paperrock: "win",
        rocklizard: "win",
        lizardspock: "win",
        spockscissors: "win",
        scissorslizard: "win",
        lizardpaper: "win",
        paperspock: "win",
        spockrock: "win",
        rockscissors: "win",
        paperscissors: "lose",
        rockpaper: "lose",
        lizardrock: "lose",
        spocklizard: "lose",
        scissorsspock: "lose",
        lizardscissors: "lose",
        paperlizard: "lose",
        spockpaper: "lose",
        rockspock: "lose",
        scissorsrock: "lose"
      },
      opponentChoice: null,
      madeChoice: false,
      result: null
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
    }
  }

  render(props) {
    return (
      <div>
        {console.log(this.state.opponentChoice)}
        {this.state.choices.map((choice, i) => {
          return (
            <button onClick={() => this.makeChoice(i)} key={i} index={i}>
              {choice}
            </button>
          );
        })}
      </div>
    );
  }
}
