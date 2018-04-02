import React, { Component } from 'react';
import SearchBar from '../searchbar/SearchBar';
import SearchResults from '../searchresults/SearchResults';
import Playlist from '../playlist/Playlist';
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
  };

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
  };

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
  };

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.state.addTrack}/>
          <Playlist 
          playlistName={this.state.playlistName} 
          playlistTracks={this.state.playlistTracks}
          onRemove={this.state.removeTrack}
          />
        </div>
      </div>
    </div>
    );
  }
};

export default App;

