import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import Playlist from './Playlist.jsx';
import AddPlaylist from './AddPlaylist.jsx';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
  }
  componentDidMount() {
    axios
      .get('/playlistsretrieve')
      .then((res) => this.setState({ playlists: res.data.items }));
  }
  render() {
    const playlistLinks = [
      <Link to='/home' key='homeLink'>
        <h1>Home</h1>
      </Link>,
      <h2>YOUR PLAYLISTS</h2>,
    ];

    for (let i = 0; i <= this.state.playlists.length; i += 1) {
      if (i < this.state.playlists.length) {
        const playlistName = this.state.playlists[i].name;
        playlistLinks.push(
          <Link to={`/playlist/?${this.state.playlists[i].id}`}>
            <h3>{playlistName}</h3>
          </Link>
        );
      } else {
        playlistLinks.push(
          <Link to='/newplaylist'>
            <h3>Add new Playlist</h3>
          </Link>
        );
      }
    }

    return (
      <Router>
        <div className='navBar'>
          <div className='linkContainer'>{playlistLinks}</div>
          <div className='bodyContainer'>
            <Switch>
              <Route path='/home' component={Home} />
            </Switch>
            <Switch>
              <Route path='/playlist' component={Playlist} />
            </Switch>
            <Switch>
              <Route path='/newplaylist' component={AddPlaylist} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default NavBar;
