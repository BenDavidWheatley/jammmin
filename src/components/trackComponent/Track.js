import React from 'react';
import Styles from './track.module.css'


function Track (props) {

    return (
        <div className={Styles.trackContainer}>
            <img className={Styles.albumCover}src={props.img}/>
    
            <section className={Styles.info}>
                <p className={Styles.song}>Song: {props.name}</p>
                <p className={Styles.artist}>Artist: {props.artist}</p>
                <p className={Styles.album}>Album: {props.album}</p>
            </section>
            <button className={Styles.addButton}>Add</button>
            
        </div>

    )
}

export default Track