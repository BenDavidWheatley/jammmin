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
            <img className={Styles.albumCover} src={props.track.image} alt="Album Cover" />

            <section className={Styles.info}>
                <div>
                    <p className={Styles.trackHeadings}>Song: </p>
                    <p className={Styles.trackHeadings}>Artist: </p>
                    <p className={Styles.trackHeadings}>Album: </p>

                </div>
                <div>
                    <p className={Styles.trackInfo}>{props.track.name}</p>
                    <p className={Styles.trackInfo}>{props.track.artist}</p>
                    <p className={Styles.trackInfo}>{props.track.album}</p>
                </div>
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