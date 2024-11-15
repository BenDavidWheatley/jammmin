import React from 'react';
import Styles from'./playlist.module.css';
import TrackList from '../trackListComponent/Track-List';

function Playlist () {
    return (
        <div>
            <button className={Styles.test}>Playlist</button>
        </div>
    );
}

export default Playlist