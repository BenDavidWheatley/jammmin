import React from 'react'
import Styles from './SearchBar.module.css'

function SearchBar (props) {
    return (
        <div className={Styles.searchContainer}>
            <input className={Styles.search}type='text' onChange={props.userSearch()}></input>
        </div>
    )
}

export default SearchBar