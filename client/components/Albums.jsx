import React from 'react';

export default function Albums(props) {
  return (
    <div className="album">
      <img src={props.result.images[0].url} />
      <br />
      <h1>{props.result.name}</h1>
    </div>
  );
}
