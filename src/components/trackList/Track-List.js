import React from 'react';
import Styles from './trackList.module.css';
import Track from '../track/Track';

const TrackList = (props) => {

  if(props.tracks){

    return (
      <div>
        {props.tracks.map((track) => {
          return (
            <Track   
                key={track.trackId}  
                track={track}
                addTrack={props.addTrack}
                removeTrack={props.removeTrack}
                buttonValue={props.buttonValue}

            />
          );
        })}
      </div>
    );
  }
};

export default TrackList