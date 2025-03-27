import React from 'react';
import Track from '../track/Track';

const TrackList = (props) => {

  if(props.tracks){
   
    return (
      <div>
        {props.reverse? props.tracks.map((track) => {
          return (
            <Track   
                key={track.id}  
                track={track}
                addTrack={props.addTrack}
                removeTrack={props.removeTrack}
                buttonValue={props.buttonValue}
            />
          );
        }).reverse(): 
        props.tracks.map((track) => {
          return (
            <Track   
                key={track.id}  
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