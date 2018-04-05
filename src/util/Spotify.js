const client_id = '3a2c64334bfe47aaae2b7189dbbe72f9';
const redirect_uri = 'http://localhost:3000/';
let accessToken;
let expiry;

const Spotify = {
	getAccessToken() {
		let url = window.location.href;
		if (accessToken) {
			return accessToken;
		}
		
		const token = url.match(/access_token=([^&]*)/);
		const expiresIn = url.match(/expires_in=([^&]*)/);
		if(accessToken && expiresIn) {
			let accessToken = url.match(/access_token=([^&]*)/);
			let expiresIn = url.match(/expires_in=([^&]*)/);
			accessToken = accessToken[1];
			expiresIn = expiresIn[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken

		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
		}
	},

	search(term) {
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
			{headers: {Authorization: `Bearer ${accessToken}`}
			
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			if (jsonResponse.tracks) {
				return jsonResponse.tracks.items.map(track => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					URI: track.uri
				}))
			}
		})
	},

	storePlaylist(name, trackURI) {
		if (name && trackURI) {

		} else {
			return;
		};
		let headers = {Authorization: `Bearer ${accessToken}`};
    	let userID;
    	let playlistID;
    	return fetch('https://api.spotify.com/v1/me',
      	{
        	headers: headers
      	}).then(response => {
        	return response.json()
      	}).then(jsonResponse => {
        	userID = jsonResponse.id;
      	}).then(() => {
        	return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
        	  {
            	method: 'POST',
            	headers: headers,
            	body: JSON.stringify({name: name})
          	}).then(response => {
            	return response.json();
          	}).then(jsonResponse => {
            	playlistID = jsonResponse.id
          	})}).then(() => {
            	fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
            	{
              		method: 'POST',
              		headers: headers,
              		body: JSON.stringify({uris: trackURI})
            	})
          	})
	}

};

export default Spotify;