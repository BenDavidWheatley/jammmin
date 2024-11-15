import React from 'react'
import Styles from './searchResults.module.css';
import TrackList from '../trackListComponent/Track-List';

function SearchResults (props) {
    
    return (
        <TrackList tracks={props.searchResults} filtered={props.filtered}/>     
    )
}

export default SearchResults