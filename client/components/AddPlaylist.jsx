import React from 'react';
import AddSongs from './AddSongs.jsx';

class AddPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      name: e.target[0].value,
      description: e.target[1].value,
    });
  }
  render() {
    return (
      <div className='addPlaylist'>
        {this.state.name ? (
          <AddSongs
            name={this.state.name}
            description={this.state.description}
          />
        ) : (
          <form onSubmit={this.handleSubmit}>
            <h1>Create a Playlist</h1>
            <p>Name</p>
            <input type='text' placeholder='My Playlist' id='name' />
            <p>Description</p>
            <textarea placeholder='Give your playlist a catchy description'></textarea>
            <br />
            <input type='submit' value='Create' id='submit' />
          </form>
        )}
      </div>
    );
  }
}

export default AddPlaylist;
