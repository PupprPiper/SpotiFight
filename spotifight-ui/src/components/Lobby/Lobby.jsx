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
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar
} from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
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
  }
};

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
      // socket: this.props.socket,
      songURI: null,
      searchQuery: null,
      songPreview: null,
      ready: false,
      topTen: [],
      song: "",
      songChoices: {}
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchSong = this.searchSong.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.socket !== this.props.socket) {
        this.props.socket.on("songChoices", data => {
            this.setState({ songChoices: data });
          });
          this.props.socket.on("newUser", () => {
            this.props.socket.emit("sendSongChoices", this.state.songChoices)
          })
    }
  }

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
          song: data.data.tracks.items[0],
          songURI: data.data.tracks.items[0].uri,
          songPreview: data.data.tracks.items[0].preview_url,
          topTen: data.data.tracks.items
        });
        this.props.songSwitch(data.data.tracks.items[0].preview_url);

        var temp = Object.assign({}, this.state.songChoices);
        temp[this.props.localUser] = data.data.tracks.items[0].name;
        this.setState({songChoices: temp})
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
  }

  handleSongClick(e) {
    if (e.preview_url === null) {
      alert("This song does not have a preview URL on spotify");
    }
    this.setState({
      song: e,
      songURI: e.uri,
      songPreview: e.preview_url
    });
  }

  render() {
    return (
      <div>
        {console.log("lobby props", this.props)}
        {console.log("lobby states", this.state)}
        <Grid container>
          <Grid item md={3}>
            <Grid container spacing={24}>
              {this.props.leftPlayers.map((item, index) => {
                return (
                  <Grid align="left" key={index} item xs={12}>
                    <Paper>
                      <div>
                        {console.log('LEFT USER URL? ', item.avatar_url)}
                        <img src={item.avatar_url} /> {item.username}
                        <div align="right">Song: {this.state.songChoices[item.username]}</div>
                      </div>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Chat
              socket={this.props.socket}
              localUser={this.props.userProfile.username}
            />
            <div align="center">
              Please search for your Song:
              <div align="center">
                <input type="text" onChange={this.handleSearchChange} />{" "}
              </div>
              <div align="center">
                {" "}
                <input type="submit" onClick={() => this.searchSong()} />{" "}
              </div>
            </div>
            {!this.state.songURI ? null : (
              <div align="center">
                <iframe
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
              {this.state.topTen.map(item => {
                return (
                  <ListItem onClick={() => this.handleSongClick(item)}>
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
                <List className={this.props.classes.musicList}>
                  <div>Select a game:</div>
                  <ListItem
                    onClick={() => {
                      this.handleGameSelect("Masher");
                    }}
                  >
                    {" "}
                    <ListItemText primary="Masher" />
                  </ListItem>
                  <Divider />
                  <ListItem
                    onClick={() => {
                      this.handleGameSelect("MusicTrivia");
                    }}
                  >
                    {" "}
                    <ListItemText primary="MusicTrivia" />
                  </ListItem>
                  <Divider />
                  <ListItem
                    onClick={() => {
                      this.handleGameSelect("RPSLS");
                    }}
                  >
                    <ListItemText primary="RPSLS" />
                  </ListItem>
                  <Divider />
                </List>
              </div>
            ) : null}
          </Grid>
          <Grid item md={3}>
            <Grid container spacing={24}>
              {this.props.rightPlayers.map((item, index) => {
                return (
                  <Grid align="left" key={index} item xs={12}>
                    <Paper>
                    <div>
                    {console.log('RIGHT USER URL? ', item.avatar_url)}
                      <img src={item.avatar_url} /> {item.username}{" "}
                      <div align="right">Song: {this.state.songChoices[item.username]}</div>
                    </div>
                  </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const styledLobby = withStyles(style)(Lobby);
export default connect(mapStateToProps, mapDispatchToProps)(styledLobby);
