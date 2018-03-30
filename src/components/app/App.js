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

    }
  };

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* Add a SearchBar component --> */}
          <SearchBar />
          <div className="App-playlist">
          {/*-- Add a SearchResults component -->*/}
          <SearchResults searchResults={this.state.searchResults} />
          {/*-- Add a Playlist component -->*/}
          <Playlist />
        </div>
      </div>
    </div>
    );
  }
};

export default App;

