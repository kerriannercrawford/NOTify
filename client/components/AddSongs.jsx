import React from 'react';
import Search from './Search.jsx';
import AddedTrack from './AddedTrack.jsx';
import axios from 'axios';

class AddSongs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
    this.addSong = this.addSong.bind(this);
    this.removeSong = this.removeSong.bind(this);
    this.sendPlaylist = this.sendPlaylist.bind(this);
  }
  addSong(track) {
    const tempArr = this.state.tracks;
    tempArr.push(track);
    this.setState({ tracks: tempArr });
  }
  removeSong(track) {
    let tempArr = this.state.tracks;
    let index;
    for (let i = 0; i < tempArr.length; i++) {
      console.log(tempArr[i].id === track.id);
      if (tempArr[i].id === track.id) {
        index = i;
      }
    }
    if (index !== null) {
      console.log('here?');
      tempArr.splice(index, 1);
      console.log(tempArr);
      this.setState({ tracks: tempArr });
    }
  }
  renderTracks() {
    const newArr = [];
    for (let i = 0; i < this.state.tracks.length; i++) {
      newArr.push(
        <AddedTrack
          removeSong={this.removeSong}
          result={this.state.tracks[i]}
        />
      );
    }
    return newArr;
  }
  sendPlaylist() {
    const obj = {
      name: this.props.name,
      description: this.props.description,
      tracks: this.state.tracks,
    };
    axios.post('/saveplaylist', obj).then((res) => {
      console.log(res);
      window.location.replace('http://localhost:3000/');
    });
  }
  render() {
    return (
      <div className="savePlaylist">
        <h1>{this.props.name}</h1>
        <h2>{this.props.description}</h2>
        <button id='newPlaylist' onClick={this.sendPlaylist}>
          Save New Playlist!
        </button>
        {this.state.tracks.length > 0 ? (
          this.renderTracks()
        ) : (
          <h3>This Playlist is Currently Empty! Add some songs below</h3>
        )}
        <br />
        <Search addSong={this.addSong} />
      </div>
    );
  }
}

export default AddSongs;
