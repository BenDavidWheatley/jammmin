import React, { useState, useCallback } from 'react';
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
  const tracks = [{
          name: 'Ashes to Ashes',
          artist: 'David Bowie',
          album: 'Scary Monsters (and Super Creeps)',
          img: Bowie,
          trackId: '1'
      },
      {
          name: 'Temple',
          artist: 'Mathew and the Atlas',
          album: 'Temple',
          img:  Temple,
          trackId: 2
      },
      {
          name: 'Last night',
          artist: 'The Strokes',
          album: 'is this is',
          img: Strokes,
          trackId: 3
      }
  ]


/********* FILTER THROUGH SEARCH RESULTS **********/

/**** COMPLETE *******/

  // this will contain all the artists based on the search and passed to <SearchResults />
  const [filteredTracks, setFilteredTracks] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const userSearch = (event) => {

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
 
  };
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
              <SearchResults tracks={filteredTracks} addTrack={addTrack} buttonValue='add' />
            </section>
  
            <section  className={Styles.trackListContainers}>
              <Playlist tracks={playlistTracks} removeTrack={removeTrack} buttonValue='remove'/>  
            </section>
  
          </div>  
         ) : <Login emptyField={Spotify.emptyFormField} handleLogin={Spotify.handleLogin} />
        }
           
      </div>
    );
}

export default App;
