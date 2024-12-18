import React, { useState } from 'react';

let clientId = false
let accessToken;

const redirectUri = 'http://localhost:3000/';
const AUTHORIZE = "https://accounts.spotify.com/authorize";


const Spotify = {
  getAccessToken(){
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch){
      accessToken = accessTokenMatch[1]; //This gets the access token from the url
      const expiresIn = Number(expiresInMatch[1]); //This gets the expires in and converts it to a number
      window.setTimeout(() => accessToken = '', expiresIn * 1000000);
      console.log('this is expires in ' + expiresIn);
     // window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    }
    //console.log(accessTokenMatch[1])
  },

  search(input) {
    if (input){
    Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track,artist,album&q=${input}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(tracks => {
      console.log(tracks)
     return tracks.albums.items.map(tracks => ({
        name: tracks.name,
        artist: tracks.artists[0].name,
        image: tracks.images[0].url,
        album: tracks.name
      }))  
    })
  }} 
}
export default Spotify;



/*const app = express();

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});*/