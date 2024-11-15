import React from 'react';
import Styles from './trackList.module.css';
import Track from '../trackComponent/Track';

const TrackList = (props) => {
  console.log(props.filtered)
  if(props.filtered){
    return (
      <div>
        {props.filtered.map((track) => (
          <li className={Styles.searchList} key={track.id}>
          <Track
                        track={track}
                        img={track.img}
                        name={track.name}
                        artist={track.artist}
                        album={track.album}
                      />
            
          </li>
        ))}
      </div>
    );
  }

/*
      <div className="TrackList">
      
        {props.tracks.map((track) => {
          return (
            <Track
              track={track}
              img={track.img}
              name={track.name}
              artist={track.artist}
              album={track.album}
            />
          );
        })}
      </div>*/
  };

export default TrackList