import React from 'react'
import TrackList from '../trackList/Track-List';

function SearchResults (props) {
    
    return (
        <TrackList tracks={props.tracks} addTrack={props.addTrack} buttonValue={props.buttonValue}/>     
    )
}

export default SearchResults