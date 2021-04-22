import React from 'react';

export default function PlaylistTrack(props) {
  return (
    <div className='trackContainer'>
      <div className='trackImg'>
        <img src={props.result.track.album.images[2].url} />
      </div>
      <div className='trackInfo'>
        <p>
          <b>Song Name:</b> {props.result.track.name}
          <br />
          <b>Artist:</b> {props.result.track.artists[0].name}
        </p>
      </div>
    </div>
  );
}
