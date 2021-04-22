const redirect_uri = 'http://localhost:3000/callback';
const clientId = 'c1531b706046487997b03cb7c288c58e';
const clientSecret = 'a32c372a4f84441d9391ce60bde7f9a3';

const querystring = require('query-string');

let scopes =
  'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-email user-read-private playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify playlist-modify-private user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify';

const newScope = scopes.replace(/ /g, '%20');
console.log(newScope);

// const AUTH_URL =
//   'https://accounts.spotify.com/authorize?client_id=c1531b706046487997b03cb7c288c58e&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-email%20user-read-private&20playlist-read-collaborative&20playlist-modify-public&20playlist-read-private&20playlist-modify-private&show_dialogue=true';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=c1531b706046487997b03cb7c288c58e&response_type=code&redirect_uri=http://localhost:3000&ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20streaming%20app-remote-control%20user-read-email%20user-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify%20playlist-modify-private%20user-library-modify%20user-library-read%20user-top-read%20user-read-playback-position%20user-read-recently-played%20user-follow-read%20user-follow-modify';

console.log(AUTH_URL);

module.exports = AUTH_URL;
