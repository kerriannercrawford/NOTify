import React from 'react';
import Featured from './Featured.jsx';
import NewReleases from './NewReleases.jsx';

class Home extends React.Component {
  render() {
    return (
      <div className="homeContainer">
        <h1>Home</h1>
        <h2>New Releases</h2>
        <NewReleases />
        <h2>Featured Playlists</h2>
        <Featured />
      </div>
    );
  }
}

export default Home;
