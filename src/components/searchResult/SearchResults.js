import React from 'react'
import Styles from './searchResults.module.css';
import TrackList from '../trackList/Track-List';

function SearchResults (props) {
    
    return (
        <TrackList tracks={props.tracks} addTrack={props.addTrack}/>     
    )
}

export default SearchResults