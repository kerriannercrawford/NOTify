import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PlaylistTrack from './PlaylistTrack.jsx';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      playlist: [],
      tracks: [],
    };
  }
  componentDidMount() {
    const id = this.props.location.search.replace('?', '');
    this.setState({ id });
    axios
      .post('/playlistsearch', id)
      .then((res) => this.setState({ playlist: res.data }));
  }
  createTracks() {
    const tracks = [];
    for (let i = 0; i < this.state.playlist.tracks.items.length; i += 1) {
      tracks.push(
        <PlaylistTrack result={this.state.playlist.tracks.items[i]} />
      );
    }
    return tracks;
  }
  render() {
    return (
      <div>
        {this.state.playlist.length < 1 ? (
          ''
        ) : (
          <div className='playlist'>
            <div className='playlistHeader'>
              {this.state.playlist.images[0] ? (
                <img src={this.state.playlist.images[0].url} />
              ) : (
                ''
              )}

              <h1>{this.state.playlist.name}</h1>
            </div>
            <h2>
              Created by {this.state.playlist.owner.display_name}.{' '}
              {this.state.playlist.followers.total} Followers
            </h2>
            <h2>{this.state.playlist.description}</h2>
            {this.state.id ? this.createTracks() : ''}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Playlist);
