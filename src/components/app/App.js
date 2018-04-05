import React, { Component } from 'react';
import SearchBar from '../searchbar/SearchBar';
import SearchResults from '../searchresults/SearchResults';
import Playlist from '../playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.storePlaylist = this.storePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let trackAdded = false;
    for (let i=0; i < this.state.playlistTracks.length; i++ ) {
      if (track.id === this.state.playlistTracks[i].id) {
        trackAdded = true;
      }
    }

    if (trackAdded === false) {
      let storePlaylist = this.state.playlistTracks;
      storePlaylist.push(track);
      this.setState({playlistTracks: storePlaylist})
    };
  }

  removeTrack(track) {
    let trackRemoved = '';
    for (let i=0; i < this.state.playlistTracks.length; i++) {
      if (track.id === this.state.playlistTracks[i].id) {
        trackRemoved = i;
      }
    };

    let storePlaylist = this.state.playlistTracks;
    storePlaylist.splice(trackRemoved, 1);
    this.setState({playlistTracks: storePlaylist});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  } 

  storePlaylist() {
    let uris = this.state.playlistTracks.map(track => track.uri);
    Spotify.storePlaylist(this.state.playlistName, uris);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    })
  }

  search(term) {
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.state.search} />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.state.addTrack}/>
          <Playlist 
          playlistName={this.state.playlistName} 
          playlistTracks={this.state.playlistTracks}
          onRemove={this.state.removeTrack}
          onNameChange={this.state.updatePlaylistName}
          onSave={this.state.storePlaylist}
          />
        </div>
      </div>
    </div>
    );
  }
};

export default App;

