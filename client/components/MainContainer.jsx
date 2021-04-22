import React from 'react';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

const code = new URLSearchParams(window.location.search).get('code');

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return code ? <Dashboard code={code} /> : <Login />;
  }
}

export default MainContainer;
