import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
import Chat from "../Chat/Chat.jsx";
import Grid from "material-ui/Grid";

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: "",
      songURI: null,
      searchQuery: null,
      songPreview: null,
      ready: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchSong = this.searchSong.bind(this);
  }
  componentDidMount() {

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
        console.log(data);
        this.setState({
          songURI: data.data.tracks.items[0].uri,
          songPreview: data.data.tracks.items[0].preview_url
        });
      });
    });
  }

  handleSearchChange(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }
  render() {
    return (
      <div>
        {console.log("lobby", this.props)}
        <Grid container>

          <Grid item md={3}>
            {" "}
            <div> Player One</div>
            <div> Player Two</div>
            <div> Player Three</div>
          </Grid>
          <Grid item md={6}>
            <Chat socket={this.props.socket} />
          </Grid>
          <Grid item md={3}>
            <div> Player Four</div>
            <div> Player Five</div>
            <div> Player Six</div>
          </Grid>

        </Grid>

        <div>
          Please search for your Song
          <input type="text" onChange={this.handleSearchChange} />
          <input type="submit" onClick={() => this.searchSong()} />
        </div>

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
      </div>
    );
  }
}
