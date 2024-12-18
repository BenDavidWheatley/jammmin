const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
  getAccessToken(){

    if (accessToken) {
      console.log(accessToken);
      return accessToken;
    }

    const storedToken = sessionStorage.getItem('accessToken');

    if (storedToken) {
      accessToken = storedToken;
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch){
      accessToken = accessTokenMatch[1]; //This gets the access token from the url
      const expiresIn = Number(expiresInMatch[1]); //This gets the expires in and converts it to a number
      sessionStorage.setItem('accessToken', accessToken);
      
      window.setTimeout(() => accessToken=false, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else{
      sessionStorage.removeItem('accessToken')
      window.location.href = redirectUri; 
    }
    console.log(accessTokenMatch[1])
  },

  search(input) {

    if (input){
    const token = Spotify.getAccessToken();
    console.log(accessToken)
    console.log(token)
    return fetch(`https://api.spotify.com/v1/search?type=track,artist,album&q=${input}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      return response.json();
     
    }).then(tracks => {
      console.log(tracks.tracks.items[0].uri)
      return tracks.tracks.items.map(tracks => ({
        id: tracks.id,
        name: tracks.name,
        artist: tracks.artists[0].name,
        image: tracks.album.images[0].url,
        album: tracks.album.name,
        uri: tracks.uri
      }))  
    })
  }},
  
  saveToSpotify(name, uri) {
    if (!name || !uri.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: uri})
        });
      });
    });
  }
  }

export default Spotify;
