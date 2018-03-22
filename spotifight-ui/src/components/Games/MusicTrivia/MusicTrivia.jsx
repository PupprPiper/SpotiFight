import React, { Component } from "react";
import Questions from './Questions.js'
import Paper from "material-ui/Paper";

export default class MusicTrivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      userAnswer: null,
      trivia_winner: null
    };
    this.randomElement= this.randomElement.bind(this)
    this.userAnswerChange = this.userAnswerChange.bind(this)

  }
  async componentWillMount() {
     this.setState({
      question: this.randomElement(Questions),
    })
  }

  async componentDidMount(){
   
  }
  
  randomElement(array){
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  
  async userAnswerChange(item){
    await this.setState({
      userAnswer: item
    })
    if(this.state.userAnswer === this.state.question.A){
      await this.setState({
        trivia_winner: this.props.localUser
      })
    }
  }


  render() {
    return <div>
    
    {console.log('trivia state', this.state)}
    {console.log('trivia props', this.props)}
     <Paper> {this.state.question.Q}</Paper> 

     <div> { 
       
       this.state.question.O.map(item => {
         return <div onClick ={()=>this.userAnswerChange(item)}> {item} </div>
       })
       }</div>
    </div>;
  }
}
