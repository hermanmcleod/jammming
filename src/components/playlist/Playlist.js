import React from 'react';
import './Playlist.css';
import TrackList from '../tracklist/TrackList';

class Playlist extends React.Component {

	constructor(props) {
		super(props)

		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(e) {
		this.props.onNameChange(e.target.value);
	}

	render() {
		return (
			<div className="Playlist">
  				<input 
  				defaultValue={'New Playlist'}
  				onChange={this.handleNameChange}
  				/>
  				{/*<!-- Add a TrackList component -->*/}
  				<TrackList 
  				tracks={this.props.playlistTracks}
  				onRemove={this.props.removeTrack}
  				onChange={this.handleNameChange}
  				/>
  				<a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
			);
	};
};

export default Playlist;