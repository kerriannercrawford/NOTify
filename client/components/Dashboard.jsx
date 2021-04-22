import React from 'react';
import NavBar from './NavBar.jsx';
import Header from './Header.jsx';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: '', profile: null };
  }
  componentDidMount() {
    const code = this.props.code;
    axios
      .post('/login', code)
      .then((res) => {
        this.setState({ accessToken: res.data.accessToken });
        window.history.pushState({}, null, '/');
      })
      .then(() => {
        axios.get('/profile').then((res) => {
          const userProfile = {
            displayName: res.data.display_name,
            id: res.data.id,
            image: res.data.images[0].url,
          };
          this.setState({ profile: userProfile });
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.profile ? (
          <div className='dashboard'>
            <Header profile={this.state.profile} />
            <NavBar />
            {/* <Player /> */}
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    );
  }
}

export default Dashboard;
