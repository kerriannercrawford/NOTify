import React from 'react';
import AUTH_URL from '../../authenticate';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick() {
    window.location.replace(
      'https://accounts.spotify.com/authorize?client_id=c1531b706046487997b03cb7c288c58e&response_type=code&redirect_uri=http://localhost:3000&scope=ugc-image-upload%20user-read-playback-state%20user-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify%20playlist-modify-private%20user-library-modify%20user-library-read%20user-top-read%20user-read-playback-position%20user-read-recently-played%20user-follow-read%20user-follow-modify'
    );
  }
  render() {
    return (
      <div className='loginPage'>
        <button>
          <a onClick={this.onClick}>Click Here To Log In</a>
        </button>
      </div>
    );
  }
}

export default Login;
