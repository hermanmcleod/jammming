import React from 'react';
import './SearchResults.css';
import TrackList from '../tracklist/TrackList';


class SearchResults extends React.Component {
	render() {
		return (
			<div className="SearchResults">
  				<h2>Results</h2>
  				{/*-- Add a TrackList component -->*/}
  				<TrackList tracks={this.props.searchResults} addTrack={this.props.onAdd}/>
			</div>
			)
	}
}

export default SearchResults;