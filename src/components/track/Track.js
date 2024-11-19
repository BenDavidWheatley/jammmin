import React, { useState, useEffect } from 'react';
import Styles from './track.module.css'

function Track(props) {
    const [addRemoveFunc, setAddRemoveFunc] = useState(() => () => {}); // Initialize with a no-op function

    useEffect(() => {
        if (props.addTrack) {
            setAddRemoveFunc(() => () => props.addTrack(props.track));
        } else {
            setAddRemoveFunc(() => () => props.removeTrack(props.track));
        }
    }, [props.addTrack, props.removeTrack]); // Dependencies

    return (
        <div className={Styles.trackContainer}>
            <img className={Styles.albumCover} src={props.track.img} alt="Album Cover" />

            <section className={Styles.info}>
                <p className={Styles.song}>Song: {props.track.name}</p>
                <p className={Styles.artist}>Artist: {props.track.artist}</p>
                <p className={Styles.album}>Album: {props.track.album}</p>
            </section>
            
            <button
                className={Styles.addButton}
                onClick={addRemoveFunc} // Use the function stored in state
            >
                {props.buttonValue}
            </button>
        </div>
    );
}

export default Track