import React, { useState, useEffect } from 'react';
import Styles from './track.module.css';

function Track(props) {
    // Destructure props
    const { addTrack, removeTrack, track, buttonValue } = props;
    
    const [addRemoveFunc, setAddRemoveFunc] = useState(() => () => {}); // Initialize with a no-op function

    useEffect(() => {
        if (addTrack) {
            setAddRemoveFunc(() => () => addTrack(track));
        } else {
            setAddRemoveFunc(() => () => removeTrack(track));
        }
    }, [addTrack, removeTrack, track]); // Now addTrack, removeTrack, and track are the direct dependencies

    return (
        <div className={Styles.trackContainer}>
            <img className={Styles.albumCover} src={track.image} alt="Album Cover" />

            <section className={Styles.info}>
                <div>
                    <p className={Styles.trackHeadings}>Song: </p>
                    <p className={Styles.trackHeadings}>Artist: </p>
                    <p className={Styles.trackHeadings}>Album: </p>
                </div>
                <div>
                    <p className={Styles.trackInfo}>{track.name}</p>
                    <p className={Styles.trackInfo}>{track.artist}</p>
                    <p className={Styles.trackInfo}>{track.album}</p>
                </div>
            </section> 
            <button
                className={Styles.addButton}
                onClick={addRemoveFunc} // Use the function stored in state
            >
                {buttonValue}
            </button>
        </div>
    );
}

export default Track;
