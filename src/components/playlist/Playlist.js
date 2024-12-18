import React from 'react';
import Styles from './playlist.module.css';
import TrackList from '../trackList/Track-List';

let reverse = true;
function Playlist(props) {
    return (
      <div className={Styles.playlistContainer}>
        <input
          id='playlistName'
          onChange={props.onChange}
          className={Styles.playlistTitle}
          placeholder='Name of playlist'
        >
        </input>

        <section className={Styles.playList}>
          <TrackList tracks={props.tracks} buttonValue={props.buttonValue} removeTrack={props.removeTrack} reverse={reverse}/>
        </section>

        <button className={Styles.addPlaylistButton} onClick={props.addPlaylist}>Add to Spotify</button>

      </div>
    );
  }
export default Playlist;
