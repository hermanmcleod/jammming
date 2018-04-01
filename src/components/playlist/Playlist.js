import React from 'react';
import './Playlist.css';
import TrackList from '../tracklist/TrackList';

class Playlist extends React.Component {
	render() {
		return (
			<div className="Playlist">
  				<input defaultValue={'New Playlist'}/>
  				{/*<!-- Add a TrackList component -->*/}
  				<TrackList playlistTrack={this.props.playlistTrack}/>
  				<a className="Playlist-save">SAVE TO SPOTIFY</a>
			</div>
			);
	};
};

export default Playlist;