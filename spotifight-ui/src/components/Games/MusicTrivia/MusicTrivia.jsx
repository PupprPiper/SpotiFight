import React, { Component } from "react";
import Questions from './Questions.js'
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { gameSwitch, songSwitch } from "../../../actions/index";
import axios from 'axios';
import { List, ListItem} from '../../Global/Material-Globals'
import { withStyles } from "material-ui/styles";
const mapStateToProps = function(state) {
  return {
    game: state.game,
    mySong: state.mySong,
    userProfile: state.userProfile
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ gameSwitch, songSwitch }, dispatch);
};

const style = {
  listItem : {
    cursor: 'pointer',
    align: 'center'
  }
}

class MusicTrivia extends Component {
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
    this.props.socket.on('REMOVE_TRIVIA_OPTIONS_ALL', data =>{
      this.state.question.O = ''
      this.forceUpdate()
    })

    this.props.socket.on('ANNOUNCE_WINNER', winner => {
      alert(winner + ' HAS WON')
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
        trivia_winner: this.props.localUser,
      })
      
    }
    if(this.state.trivia_winner === this.props.localUser) {
      
      this.state.question.O = ''
      this.props.socket.emit("REMOVE_TRIVIA_OPTIONS", '')
      this.props.socket.emit("SEND_WINNER_SONG", this.props.mySong)
      this.props.socket.emit('TRIVIA_WINNER', this.props.localUser)
      this.forceUpdate()
      
      this.props.players.forEach((player => {
        console.log(player.username, 'WINNER ', this.state.trivia_winner)
        if(player.username !== this.state.trivia_winner){
          axios.put('http://localhost:3000/users/addWinLoss', {field: 'losses', user_id: player.id })
        }else{
          axios.put('http://localhost:3000/users/addWinLoss', {field: 'wins', user_id: player.id })
        }
      }))
      
    }
  }


  render() {
    return <div>
    {console.log('localstore', localStorage)}
    {console.log('trivia state', this.state)}
    {console.log('trivia props', this.props)}
    <div align = "center" >  <Paper> {this.state.question.Q}</Paper> </div> 

     <List> { this.state.question.O ?
      
       this.state.question.O.map(item => {
         return <div onClick ={()=>this.userAnswerChange(item)}> <ListItem className = {style.listItem}> {item} </ListItem>  </div>
       }) : null
       }</List>
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicTrivia)