import React, { Component } from "react";
import Questions from './Questions.js'
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { gameSwitch, songSwitch } from "../../../actions/index";
import axios from 'axios';
import { List, ListItem} from '../../Global/Material-Globals'
import { withStyles } from "material-ui/styles";
import AlertDialog from './alert'
import Confetti from 'react-confetti'
import './MusicTrivia.scss'
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
  },
  question:{
    padding: '20px',
    margin: '10px'

  },
  musicItem:{
  'text-align': 'center',
  cursor: 'pointer',
  },
  winnerStyle :{
    fontSize: '6em',
    textAlign: 'center'
  }
}

class MusicTrivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      userAnswer: null,
      trivia_winner: null,
      alert: false,
      confetti: false,
      announce_winner: true
    
    };
    this.randomElement= this.randomElement.bind(this)
    this.userAnswerChange = this.userAnswerChange.bind(this)

  }
  async componentWillMount() {

    this.props.socket.on('REMOVE_TRIVIA_OPTIONS_ALL', data =>{
      this.state.question.O = ''
      this.forceUpdate()
    })

    this.props.socket.on('ANNOUNCE_WINNER', winner => {
      this.setState({trivia_winner: winner})
      // alert(winner + ' HAS WON')
      // this.setState({confetti: true})
    })
  }

  componentDidMount(){
    let question = this.randomElement(Questions)
    if(this.props.localUser === this.props.host){
      this.setState({question: question})
      this.props.socket.emit('HOST_QUESTION', question)
    }
  
    this.props.socket.on('RECIEVE_QUESTION', data =>{

      this.setState({
       question: data,
     })
    })
  }
  
  randomElement(array){
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  
  async userAnswerChange(item){
    this.setState({alert:false})
    await this.setState({
      userAnswer: item
    })
    if(this.state.userAnswer === this.state.question.A){
      await this.setState({
        trivia_winner: this.props.localUser,
      })
    } else{

      this.state.question.O.splice(this.state.question.O.indexOf(this.state.userAnswer), 1);
      this.setState({alert: true})
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
          axios.put('/users/addWinLoss', {field: 'losses', user_id: player.id })
        }else{
          axios.put('/users/addWinLoss', {field: 'wins', user_id: player.id })
        }
      }))
      
    }
  }


  render() {

    
    return (<div>
          {(this.state.trivia_winner) ?
      <div className={this.props.classes.winnerStyle}>{this.state.trivia_winner} IS THE WINNER!</div>:null}
    {console.log('trivia state', this.state)}
   
    {this.state.alert ?  <AlertDialog /> : null}
    
    <div align = "center" >  <Paper className = {this.props.classes.question}> {this.state.question.Q}</Paper> </div> 
  
     <List> { this.state.question.O ?
      
       this.state.question.O.map(item => {
         return <Paper onClick ={()=>this.userAnswerChange(item)} className = {this.props.classes.musicItem}> {item} </Paper>
       }) : null
       }</List>

    </div>
    )}
}
const styledMusicTrivia = withStyles(style)(MusicTrivia)
export default connect(mapStateToProps, mapDispatchToProps)(styledMusicTrivia)
