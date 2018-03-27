import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
import Chat from "../Chat/Chat.jsx";
import Grid from "material-ui/Grid";
import { songSwitch, gameSwitch } from "../../actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider';

const mapStateToProps = function(state) {
  return {
    mySong: state.mySong,
    userProfile: state.userProfile,
    game: state.game

  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ gameSwitch, songSwitch }, dispatch);
};

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket,
      songURI: null,
      searchQuery: null,
      songPreview: null,
      ready: false,
      topTen: [],
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchSong = this.searchSong.bind(this);
  }
  componentDidMount() {}

  searchSong() {
    axios.get("/spotify").then(token => {
      axios({
        url: `https://api.spotify.com/v1/search?q=${
          this.state.searchQuery
        }&type=track`,
        headers: {
          Authorization: "Bearer " + token.data
        }
      }).then(data => {
        if (data.data.tracks.items[0].preview_url === null) {
          alert("This song does not have a preview URL on spotify");
        }
        this.setState({
          songURI: data.data.tracks.items[0].uri,
          songPreview: data.data.tracks.items[0].preview_url,
          topTen: data.data.tracks.items
        });
        this.props.songSwitch(data.data.tracks.items[0].preview_url);
        this.props.userProfile.userSong = this.props.mySong;
      });
    });
  }

  handleSearchChange(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }
  handleGameSelect(item) {

    this.props.gameSwitch(item)
    
  }

  handleSongClick(e){
    this.setState({
      songURI: e.uri,
      songPreview: e.preview_url
    })
  }

  render() {
    return (
      <div>
        {console.log("lobby top ten", this.state.topTen)}
        <Grid container>
          <Grid item md={3}>
            <Grid container spacing={24}>
              {this.props.players.map((item, index) => {
                // if(index === Math.floor(this.props.players.length/2)){
                return (
                  <Grid align="left" key={index} item xs={12}>
                    <Paper>
                      
                      <div> <img src = {item.avatar_url} />  {item.username} </div>
                    </Paper>
                  </Grid>
                )
              // };
              })}
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Chat socket={this.props.socket} localUser = {this.props.userProfile.username}/>
          </Grid>
          <Grid item md={3}>
            <div> Player Four</div>
            <div> Player Five</div>
            <div> Player Six</div>
          </Grid>
        </Grid>
        
        {this.props.host === this.props.localUser ? ( <List>
          <ListItem onClick = {()=>{this.handleGameSelect('Masher')}} >  <ListItemText primary = 'Masher'/></ListItem>
          <Divider />
          <ListItem onClick = {()=>{this.handleGameSelect('MusicTrivia')}}> <ListItemText primary = 'MusicTrivia'/></ListItem>
          <Divider />
          <ListItem onClick = {()=>{this.handleGameSelect('RPSLS')}}><ListItemText primary = 'RPSLS'/></ListItem>
          <Divider />
          </List>) : null

        }
      
        <div>
          Please search for your Song
          <input type="text" onChange={this.handleSearchChange} />
          <input type="submit" onClick={() => this.searchSong()} />
        </div>
        <List>
        {this.state.topTen.map(item =>{
          return <ListItem  onClick = {()=>this.handleSongClick(item)} > <ListItemText primary ={item.name} secondary = {item.artists[0].name}/> </ListItem> <Divider />
        })}
        </List>
        {!this.state.songURI ? null : (
          <div>
            <iframe
              src={`https://open.spotify.com/embed?uri=${this.state.songURI}`}
              width="300"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
            {/* <audio src = {this.state.songPreview} autoPlay/> */}
          </div>
        )}
    
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
