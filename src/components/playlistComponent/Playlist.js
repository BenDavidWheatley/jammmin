import React from 'react';
import Styles from './playlist.module.css';
import TrackList from '../trackListComponent/Track-List';
import Track from '../trackComponent/Track';

function Playlist(props) {
    const test =
      props.addedTracks && props.addedTracks.childNodes
        ? props.addedTracks.childNodes[0]
        : null;
  
    return (
      <div className={Styles.playlistContainer}>
        <input
          className={Styles.playlistTitle}
          placeholder="Name Your Playlist"
        ></input>
        <section className={Styles.playList}>
          <TrackList addedTracks={props.addedTracks} />
        </section>
       
        {test ? (
             <Track img={test.src} buttonText='remove'/>  
        ) : (
          <p>No tracks added yet</p>
        )}
        <button className={Styles.addPlaylistButton}>Playlist</button>
      </div>
    );
  }
  


export default Playlist;
