import React, { useCallback } from 'react';
import Styles from './track.module.css'


function Track (props) {

    return (
        <div className={Styles.trackContainer} >
            <img className={Styles.albumCover}src={props.track.img}/>
    
            <section className={Styles.info}>
                <p className={Styles.song}>Song: {props.track.name}</p>
                <p className={Styles.artist}>Artist: {props.track.artist}</p>
                <p className={Styles.album}>Album: {props.track.album}</p>
            </section>
            <button 
                className={Styles.addButton} 
                onClick={() => props.addTrack(props.track)}
            >{props.buttonText === 'remove'? 'Remove' : 'Add'}
            </button>
            
        </div>

    )
}

export default Track