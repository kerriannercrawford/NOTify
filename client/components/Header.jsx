import React from 'react';

export default function Header(props) {
  return (
    <div className='header'>
      {props.profile.displayName ? (
        <div className='headerInfo'>
          {' '}
          <img src={props.profile.image} />
          <h2>{props.profile.displayName}</h2>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
}
