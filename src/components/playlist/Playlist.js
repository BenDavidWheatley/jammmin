import React from 'react';
import Styles from './playlist.module.css';
import TrackList from '../trackList/Track-List';
import Track from '../track/Track';

function Playlist(props) {
    const addedToPlaylist =
      props.playlistTracks && props.playlistTracks.childNodes
        ? props.playlistTracks.childNodes[0]
        : null;
  
    return (
      <div className={Styles.playlistContainer}>
        <input
          className={Styles.playlistTitle}
          placeholder="Name Your Playlist"
        ></input>
        <section className={Styles.playList}>
        <TrackList tracks={props.tracks} />
        </section>
       
   {/*     {addedToPlaylist ? (
             <Track img={addedToPlaylist.src} buttonText='remove'/>  
        ) : (
          <p>No tracks added yet</p>
        )} */}
        <button className={Styles.addPlaylistButton}>Playlist</button>
      </div>
    );
  }
  


export default Playlist;
