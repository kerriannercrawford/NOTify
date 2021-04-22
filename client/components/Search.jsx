import React from 'react';
import axios from 'axios';
import Track from './Track.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const query = e.target[0].value;
    axios.post('/search', query).then((res) => {
      this.setState({ searchResults: res.data.tracks.items });
    });
  }
  createTrackList() {
    const tracks = [];
    for (let i = 0; i < this.state.searchResults.length; i += 1) {
      tracks.push(
        <Track
          result={this.state.searchResults[i]}
          addSong={this.props.addSong}
        />
      );
    }
    return tracks;
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Search for a Song...'
            id='searchText'
          />
          <br />
          <input type='submit' value='Search!' id='searchSubmit' />
        </form>
        {this.state.searchResults ? this.createTrackList() : ''}
      </div>
    );
  }
}

export default Search;
