import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
import Chat from "../Chat/Chat.jsx";
import Grid from "material-ui/Grid";
import {
  songSwitch,
  gameSwitch,
  updateSongSelections,
  updatePlayers
} from "../../actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Verify from "../Auth/Verify.jsx";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Avatar,
  Checkbox,
  Button
} from "./../Global/Material-Globals";
import Carousel from "nuka-carousel";
import { games } from "../Home/homeHelpers";
import GameListItem from "../Home/GameListItem";
import AlertDialog from "./alert.jsx";
import "./Lobby.scss";

const style = {
  avatar: {
    height: 100,
    width: 100,
    cursor: "pointer"
  },
  musicList: {
    overflow: "scroll",
    maxHeight: 300,
    maxWidth: 700,
    margin: "auto",
    cursor: "pointer"
  },
  gameItem: {
    height: 100,
    width: 100,
    cursor: "pointer"
  },
  musicItem: {
    align: "center"
  }
};
/*
Redux setup so we can have access to each player's object globally, and the current game being play in the lobby
*/
const mapStateToProps = function(state) {
  return {
    mySong: state.mySong,
    userProfile: state.userProfile,
    game: state.game,
    songSelections: state.songSelections,
    globalPlayers: state.globalPlayers
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    { gameSwitch, songSwitch, updateSongSelections, updatePlayers },
    dispatch
  );
};

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songURI: null,
      searchQuery: null,
      songPreview: null,
      ready: false,
      topTen: [],
      song: "",
      songChoices: {},
      players: this.props.players,
      alert: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchSong = this.searchSong.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (prevProps.socket !== this.props.socket) {
    //When the component loads, we want to make sure that everyone in the lobby can see the song that the player has chosen and actively updates
      this.props.socket.on("songChoices", data => {
        this.props.updateSongSelections(data);
        this.setState({ songChoices: this.props.songSelections });
      });
    //When a new user joins the room, we want the lobby to actively update to show everyone that is in the Lobby, so that the number of users is up to date
      this.props.socket.on("newUser", () => {
        if (this.props.songSelections) {
          this.setState({ songChoices: this.props.songSelections });
        }
      });
    }
  }

  componentDidMount(){
  //This sets the setting so that when the host clicks 'Return to Lobby', it takes all users back to lobby so no user is left in game
    if(this.props.socket){
      this.props.socket.on('RETURN_ALL_TO_LOBBY', () => {
        this.props.updateSongSelections({});
      this.setState({songChoices:{}})
      })
  //This shows all the songs that are returned from the spotify API based on the player's search query
      this.props.socket.on("songChoices", data => {
        this.props.updateSongSelections(data);
        this.setState({ songChoices: this.props.songSelections });
      });
    }

  }

 searchSong() {
    this.setState({ alert: false });
    //this makes a request to the spotify API requesting a token, to allow us to retrieve song data
    axios.get("/spotify").then(token => {
      axios({
        url: `https://api.spotify.com/v1/search?q=${
          this.state.searchQuery
        }&type=track`,
        headers: {
          Authorization: "Bearer " + token.data
        }
      }).then(data => {
      //if the song does not have a preview url, then we alert the player that the song that they chose will not play if they win
        if (data.data.tracks.items[0].preview_url === null) {
          this.setState({ alert: true });
        }
      //when the song is chosen, we set the song's metadata
        this.setState({
          song: data.data.tracks.items[0],
          songURI: data.data.tracks.items[0].uri,
          songPreview: data.data.tracks.items[0].preview_url,
          topTen: data.data.tracks.items
        });
      //each player has their chosen song set as their global song state
        this.props.songSwitch(data.data.tracks.items[0].preview_url);
        var temp = Object.assign({}, this.props.songSelections);

        temp[this.props.localUser] = data.data.tracks.items[0].name;
        this.setState({ songChoices: temp });
        this.props.socket.emit("sendSongChoices", temp);
      });
    });
  }

  handleSearchChange(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }
  handleGameSelect(item) {
    //only host gets the option to change games for everyone in the room
    this.props.gameSwitch(item);
    this.props.socket.emit("CHAT_USER", this.props.localUser);
    //alerts all users in the chat that the game has been changes
    this.props.socket.emit(
      "send message",
      `I have changed the game to ${item}`
    );
  }

  async handleSongClick(e) {
    await this.setState({ alert: false });
    if (e.preview_url === null) {
      await this.setState({ alert: true });
    }

    this.setState({
      song: e,
      songURI: e.uri,
      songPreview: e.preview_url
    });
    this.props.songSwitch(e.preview_url);
    var temp = Object.assign({}, this.props.songSelections);
    temp[this.props.localUser] = e.name;
    this.setState({ songChoices: temp });
    this.props.socket.emit("sendSongChoices", temp);
  }

  render() {
    return (
      <div style={{ marginTop: "1%" }}   >
        {this.state.alert === true ? <AlertDialog /> : null}

        <Grid container>
          <Grid item md={3}>
            <Grid>
              {
        //if the index of the player is even, place them on the left side
                this.props.players
                .filter((item, index) => {
                  if (index % 2 === 0) {
                    return item;
                  }
                })
                .map((filtered, index) => {
                  return (
        //give each player a Card with their picture, name, and selected song
                    <Paper key={index}>
                      <ListItem dense button className="list-item">
                        <Avatar src={filtered.avatar_url} />
                        <ListItemText
                          primary={`${filtered.username}`}
                          secondary={`Song: ${
                            this.state.songChoices.hasOwnProperty([
                              filtered.username
                            ])
                              ? this.state.songChoices[filtered.username]
                              : ""
                          }`}
                        />
                      </ListItem>
                    </Paper>
                  );
                })}
            </Grid>
          </Grid>
          <Grid item md={6}>
          
            <Chat
              socket={this.props.socket}
              localUser={this.props.userProfile.username}
            />

            <div className="field">
              <div
                className="control"
                style={{ textAlign: "center" }}
                align="center"
              >
                <input
                  className="input"
                  type="text"
                  placeholder="Search for a song"
                  style={{ width: "250px" }}
                  onChange={this.handleSearchChange}
                />

                <a className="button is-info" onClick={() => this.searchSong()}>
                  Search
                </a>
              </div>
            </div>

            {!this.state.songURI ? null : (
    //Embedded a Spotify Player so that the player can preview their chosen song
              <div align="center">
                <iframe
                  id="spotiplayer"
                  src={`https://open.spotify.com/embed?uri=${
                    this.state.songURI
                  }`}
                  width="700"
                  height="80"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                />
              </div>
            )}

            <List className={this.props.classes.musicList}>
              {this.state.topTen.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    onClick={() => this.handleSongClick(item)}
                    className={this.props.classes.musicItem}
                  >
                    {" "}
                    <ListItemAvatar>
                      <Avatar
                        src={item.album.images[0] ? item.album.images[0].url : 0}
                        className={this.props.classes.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={item.artists[0].name}
                    />{" "}
                  </ListItem>
                );
              })}
            </List>
            { 
      // If the player is the host of the lobby, give them the option to change the game
              this.props.host === this.props.localUser ? (
              <div align="center">
                {
                  <Carousel renderBottomCenterControls={false} slidesToShow={4}>
                    {games.map((item, i) => {
                      return (
                        <div
                          key={i}
                          gameitem={item}
                        >
                          <Avatar
                            src={item.image}
                            className={this.props.classes.gameItem}
                            onClick={() => {
                              this.handleGameSelect(item.title);
                            }}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                }
              </div>
            ) : null}
          </Grid>
          <Grid item md={3}>
            <Grid>
            {
    //if player index in the array is odd, place them on the right side of the screen
              this.props.players
                .filter((item, index) => {
                  if (index % 2 === 1) {
                    return item;
                  }
                })
                .map((filtered, index) => {
                  return (
      ////give each player a Card with their picture, name, and selected song
                    <Paper key={index}>
                      <ListItem dense button className="list-item">
                        <Avatar src={filtered.avatar_url} />
                        <ListItemText
                          primary={`${filtered.username}`}
                          secondary={`Song: ${
                            this.state.songChoices.hasOwnProperty([
                              filtered.username
                            ])
                              ? this.state.songChoices[filtered.username]
                              : ""
                          }`}
                        />
                      </ListItem>
                    </Paper>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
        <Verify />
      </div>
    );
  }
}
const styledLobby = withStyles(style)(Lobby);
export default connect(mapStateToProps, mapDispatchToProps)(styledLobby);
