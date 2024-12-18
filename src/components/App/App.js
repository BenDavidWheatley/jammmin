import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from '../searchBar/SearchBar';
import SearchResults from '../searchResult/SearchResults';
import Playlist from '../playlist/Playlist';
import Styles from './App.module.css';
import Login from '../login/login';
import Spotify from '../../util/spotify'

function App () {

  //The below tracks variable is an array for testing purposes
  
  const redirectUri = 'http://localhost:3000/';
  const AUTHORIZE = "https://accounts.spotify.com/authorize";

  const [tracks, setTracks] = useState([]);
  const [clientId, setClientId] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  /* handleLogin will set clientId with the client ID that spotify provides */

  const handleLogin = () => {
      let getId = document.getElementById('clientId');       
      if(getId.value) { 
        setClientId(getId.value); // This is the client ID provided by spotify
        getId.classList.remove('error'); 
      } else {
        setClientId(false);
        getId.classList.add('error'); 
      }
    }

/* The below useEffect will run when clientId is updated and will redirect the user to the spotify permissions screen */

  useEffect(() => {
      if(clientId){
        sessionStorage.removeItem('accessToken');
        let url = AUTHORIZE;
        url += "?client_id=" + clientId;
        url += "&response_type=token"; //Note that the solution code used token
        url += "&redirect_uri=" + encodeURI(redirectUri);
        url += "&show_dialog=true";
        url += "&scope=playlist-modify-public";
        window.location.href = url;  
      }
/* Checks if the url has an access token and sets loggedIn. LoggedIn determines if the login displays or the search */

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);

    if(accessTokenMatch){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  }, [clientId]);


/********* FILTER THROUGH SEARCH RESULTS **********/

/**** COMPLETE *******/

// this will contain all the artists based on the search and passed to <SearchResults />
//const [filteredTracks, setFilteredTracks] = useState(null);

  const userSearch = (event) => {
      const input = event.target.value.toLowerCase();
      
      if(input){
        Spotify.search(input).then(setTracks);
        console.log(tracks[0])
      }
    };


  /********** ADD TRACK TO PLAYLIST  ***********/

   //This array will be send to <Playlists to render />

 // const [removeFromPlaylist, setRemoveFromPlaylist] = useState(null)
// addToPlayList is passed to the <SearchResults /> and used as an onClick event to add the song to an array that will update <Playlist />
  const addTrack = (track) => {
      if(playlistTracks.some((playlistTracks) => playlistTracks.id === track.id)){
        return;
      }
      setPlaylistTracks([...playlistTracks, track])
  };


/********** REMOVE TRACK FROM PLAYLIST *************/

const removeTrack = (track) => {
  setPlaylistTracks((prevTracks) =>
    prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
  );
}


/********** ADD PLAYLIST TO SPOTIFY ***********/

//Update the name of the playlist

const playlistTitle = () => {
  setPlaylistName(document.getElementById('playlistName').value);
}

const addPlaylist = () => {

  const uri = playlistTracks.map((track) => track.uri);

  Spotify.saveToSpotify(playlistName, uri).then(() => {
    document.getElementById('playlistName').value = '';
    setPlaylistTracks([]);
  });
};


/********** Returned JSX **********/
  return (
      <div> 
          <div  className={loggedIn ? Styles.headingAndSearch : Styles.headingNotLogged}>
            <div>
              <h1 className={Styles.mainHeading}>Ja<span className={Styles.mmm}>mmm</span>in</h1>
              <p className={Styles.subHeading}>Explore. Play. Repeat</p>
            </div>  
            { loggedIn ? ( 
            <SearchBar userSearch={() => userSearch} />
          ) : <Login handleLogin={handleLogin} />} 
          </div>    

        { loggedIn ? (
            <div className={Styles.outerContainer}>
            <section className={Styles.trackListContainers}>
              <SearchResults 
                tracks={tracks} 
                addTrack={addTrack} 
                buttonValue='Add' />
            </section>
  
            <section  className={Styles.trackListContainers}>
              <Playlist 
                tracks={playlistTracks} 
                name={playlistName}
                onChange={playlistTitle}
                removeTrack={removeTrack} 
                buttonValue='Remove'
                addPlaylist={addPlaylist}/>  
            </section>
          </div>  
         ) : null 
        }
      </div>
    );
}
export default App;
