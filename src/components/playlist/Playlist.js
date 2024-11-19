import React from 'react';
import Styles from './playlist.module.css';
import TrackList from '../trackList/Track-List';
import Track from '../track/Track';

function Playlist(props) {
    return (
      <div className={Styles.playlistContainer}>
        <input
          className={Styles.playlistTitle}
          placeholder="Name Your Playlist"
        >
        </input>

        <section className={Styles.playList}>
          <TrackList tracks={props.tracks} buttonValue={props.buttonValue} removeTrack={props.removeTrack}/>
        </section>

        <button className={Styles.addPlaylistButton}>Playlist</button>

      </div>
    );
  }
  


export default Playlist;
