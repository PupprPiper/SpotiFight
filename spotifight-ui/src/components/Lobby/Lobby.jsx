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
import PlayerList from "./players/playerList";
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
      // socket: this.props.socket,
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
      this.props.socket.on("songChoices", data => {
        this.props.updateSongSelections(data);
        this.setState({ songChoices: this.props.songSelections });
      });
      this.props.socket.on("newUser", () => {
        if (this.props.songSelections) {
          this.setState({ songChoices: this.props.songSelections });
        }
      });

    }
  }

  componentDidMount(){
    if(this.props.socket){
      this.props.socket.on('RETURN_ALL_TO_LOBBY', () => {
        this.props.updateSongSelections({});
      this.setState({songChoices:{}})
      })
      this.props.socket.on("songChoices", data => {
        this.props.updateSongSelections(data);
        this.setState({ songChoices: this.props.songSelections });
      });
    }

  }

  searchSong() {
    this.setState({ alert: false });
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
          this.setState({ alert: true });
          // alert("This song does not have a preview URL on spotify");
        }
        this.setState({
          song: data.data.tracks.items[0],
          songURI: data.data.tracks.items[0].uri,
          songPreview: data.data.tracks.items[0].preview_url,
          topTen: data.data.tracks.items
        });

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
    this.props.gameSwitch(item);
    this.props.socket.emit("CHAT_USER", this.props.localUser);
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
    console.log("e", e);
    var temp = Object.assign({}, this.props.songSelections);
    console.log("lobby state ", this.state);
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
              {/* <PlayerList
                leftPlayers={this.props.leftPlayers}
                songChoices={this.state.songChoices}
              /> */}
              {this.props.players
                .filter((item, index) => {
                  if (index % 2 === 0) {
                    return item;
                  }
                })
                .map((filtered, index) => {
                  return (
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
                {/* <audio src = {this.state.songPreview} autoPlay/> */}
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
                        src={item.album.images[0].url}
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
            {this.props.host === this.props.localUser ? (
              <div align="center">
                {
                  <Carousel renderBottomCenterControls={false} slidesToShow={4}>
                    {games.map((item, i) => {
                      return (
                        <div
                          key={i}
                          gameitem={item}
                          //if selected item, set item.hover, else item.image
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
            {this.props.players
                .filter((item, index) => {
                  if (index % 2 === 1) {
                    return item;
                  }
                })
                .map((filtered, index) => {
                  return (
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
