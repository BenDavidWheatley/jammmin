import React, { useState } from 'react';
import SearchBar from './components/searchBarComponent/SearchBar';
import SearchResults from './components/searchResultComponent/SearchResults';
import Playlist from './components/playlistComponent/Playlist';
import Styles from './App.module.css';
import Bowie from './testImages/DavidBowieScaryMonstersCover.jpg'
import Strokes from './testImages/isThisIt.png'
import Temple from './testImages/temple.jpeg'

function App () {

  //The below tracks variable is an array for testing purposes
  const tracks = [{
          name: 'Ashes to Ashes',
          artist: 'David Bowie',
          album: 'Scary Monsters (and Super Creeps)',
          img: Bowie,
          id: 1
      },
      {
          name: 'Temple',
          artist: 'Mathew and the Atlas',
          album: 'Temple',
          img:  Temple,
          id: 2
      },
      {
          name: 'Last night',
          artist: 'The Strokes',
          album: 'is this is',
          img: Strokes,
          id: 3
      }
  ]

/********* FILTER THROUGH SEARCH RESULTS **********/


  // this will contain all the artists based on the search and passed to <SearchResults />
  const [filteredTracks, setFilteredTracks] = useState(null);

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
  const [playlistTracks, setPlaylistTracks] = useState(null);
  
  const addToPlaylist = (event) => {

    console.log('Track was added');
    setPlaylistTracks(event.target.parentNode);

  }
  /********** Returned JSX **********/
  return (
    <div>
      <div className={Styles.headingAndSearch}>
     
        <h1>Ja<span className={Styles.mmm}>mmm</span>in</h1>
        <p>Explore. Play. Repeat</p>
        <SearchBar userSearch={()=>userSearch} />
      </div>
      
      <div className={Styles.outerContainer}>
        <section className={Styles.trackListContainers}>
          <SearchResults searchResults={tracks} filtered={filteredTracks} addToPlayList={addToPlaylist}/>
        </section>
        <section  className={Styles.trackListContainers}>
          <Playlist addedTracks={playlistTracks} />
        </section>
      </div>     
    </div>
  );
}

export default App;
