import React, { useState, useCallback, useEffect } from 'react';
import SearchBar from '../searchBar/SearchBar';
import SearchResults from '../searchResult/SearchResults';
import Playlist from '../playlist/Playlist';
import Styles from './App.module.css';
import Login from '../login/login';
import Bowie from '../../testImages/DavidBowieScaryMonstersCover.jpg'
import Strokes from '../../testImages/isThisIt.png'
import Temple from '../../testImages/temple.jpeg'
import Spotify from '../../util/spotify'

function App () {

  //The below tracks variable is an array for testing purposes
  const [tracks, setTracks] = useState([]);


const redirectUri = 'http://localhost:3000/';
const AUTHORIZE = "https://accounts.spotify.com/authorize";

const [clientId, setClientId] = useState();
const [loggedIn, setLoggedIn] = useState(false);

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
const [filteredTracks, setFilteredTracks] = useState(null);

const userSearch = (event) => {
    const input = event.target.value.toLowerCase();
    
    if(input){
      Spotify.search(input).then(setTracks);
      console.log(tracks)
    }
  };

  
  /*const userSearch = (event) => {

    const input = event.target.value.toLowerCase(); // Convert input to lowercase. This is the value of the search bar
    //If the search bar is empty then filteredTracks is null which will be passed to <SearchResults /> and will not display any albums
    
    if(input === '') { 
      setFilteredTracks(null)
    }else {
      const results = tracks.filter((track) => // Filter tracks based on artist name, album or song
        track.artist.toLowerCase().includes(input) ||// Check if input is a substring
        track.album.toLowerCase().includes(input) ||
        track.name.toLowerCase().includes(input)
    );
    setFilteredTracks(results); // This will then get passed to the <SearchResults /> component as a prop. 
  }
 
  };*/


  /********** ADD TRACK TO PLAYLIST  ***********/

  const [playlistTracks, setPlaylistTracks] = useState([]); //This array will be send to <Playlists to render />

  const [removeFromPlaylist, setRemoveFromPlaylist] = useState(null)
  // addToPlayList is passed to the <SearchResults /> and used as an onClick event to add the song to an array that will update <Playlist />
  const addTrack = (track) => {
      if(playlistTracks.some((playlistTracks) => playlistTracks.trackId === track.trackId)){
        return;
      }
      setPlaylistTracks([...playlistTracks, track])
  };

  /********** REMOVE TRACK FROM PLAYLIST *************/


const removeTrack = (track) => {
  setPlaylistTracks((prevTracks) =>
    prevTracks.filter((currentTrack) => currentTrack.trackId !== track.trackId)
  );
}

const userLogin = () => {
  setLoggedIn = !loggedIn;
}



  /********** Returned JSX **********/
    return (
      <div>
        <div className={Styles.headingAndSearch}>
      
          <h1>Ja<span className={Styles.mmm}>mmm</span>in</h1>
          <p>Explore. Play. Repeat</p>
        { loggedIn ? ( <SearchBar userSearch={() => userSearch} /> ) : <p></p>}
          
        </div>
        { loggedIn ? (
       

            <div className={Styles.outerContainer}>

            <section className={Styles.trackListContainers}>
              <SearchResults 
                tracks={tracks} 
                addTrack={addTrack} 
                buttonValue='add' />
            </section>
  
            <section  className={Styles.trackListContainers}>
              <Playlist 
                tracks={playlistTracks} 
                removeTrack={removeTrack} 
                buttonValue='remove'/>  
            </section>
  
          </div>  
         ) : <Login 
               // emptyField={Spotify.emptyFormField} 
                handleLogin={handleLogin} />
        }
           
      </div>
    );
}

export default App;
