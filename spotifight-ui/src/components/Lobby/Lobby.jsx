import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: "",
      songURI: null,
      searchQuery: null,
      songPreview: null
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchSong = this.searchSong.bind(this);
  }
  componentDidMount() {
    this.socket = io.connect("http://localhost:8000");
    this.setState({ socket: this.socket });
  }

  searchSong() {
    const client_id = "557cbbb0600048049128711433d8ccaa";
    const redirect_uri = "http://localhost:3000";
    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);

    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

    axios.get("/spotify").then(token => {
      axios({
        url: `https://api.spotify.com/v1/search?q=${
          this.state.searchQuery
        }&type=track`,
        headers: {
          Authorization:
            "Bearer " + token
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
        {console.log(this.state)}
        <div>Hello from Lobby</div>
        <div>Please search for your Song</div>
        <div>
          {" "}
          <input type="text" onChange={this.handleSearchChange} />
          <input type="submit" onClick={() => this.searchSong()} />
        </div>

        <div>
          <iframe
            src={`https://open.spotify.com/embed?uri=${this.state.songURI}`}
            width="300"
            height="80"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          />
          {/* <audio src = {this.state.songPreview} autoPlay/> */}
        </div>
      </div>
    );
  }
}
