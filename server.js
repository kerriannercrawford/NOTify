const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const PORT = 3000;
const clientId = 'c1531b706046487997b03cb7c288c58e';
const clientSecret = 'a32c372a4f84441d9391ce60bde7f9a3';

const app = express();

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

app.use(express.json());
app.use(express.urlencoded());

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:3000',
  clientId: clientId,
  clientSecret: clientSecret,
});

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify',
];

const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

console.log(authorizeURL);

app.listen(PORT, () => console.log('listening'));

app.get('/initial', (req, res) => {
  res.redirect(
    'https://accounts.spotify.com/authorize?client_id=c1531b706046487997b03cb7c288c58e&response_type=code&redirect_uri=http://localhost:3000&ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20streaming%20app-remote-control%20user-read-email%20user-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify%20playlist-modify-private%20user-library-modify%20user-library-read%20user-top-read%20user-read-playback-position%20user-read-recently-played%20user-follow-read%20user-follow-modify'
  );
});

app.post('/login', (req, res) => {
  const code = Object.keys(req.body)[0];
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      spotifyApi.setAccessToken(data.body.access_token);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => console.log(err));
});

app.get('/profile', (req, res) => {
  spotifyApi
    .getMe()
    .then((data) => res.json(data.body))
    .catch((err) => console.log(err));
});

app.post('/search', (req, res) => {
  const query = Object.keys(req.body)[0];
  spotifyApi
    .searchTracks(query)
    .then((data) => res.json(data.body))
    .catch((err) => console.log(err));
});

app.get('/playlistsretrieve', (req, res) => {
  spotifyApi.getMe().then((data) => {
    spotifyApi
      .getUserPlaylists(data.body.id)
      .then((data) => res.json(data.body))
      .catch((err) => console.log(err));
  });
});

app.post('/playlistsearch', (req, res) => {
  const query = Object.keys(req.body)[0];
  spotifyApi.getPlaylist(query).then((data) => res.json(data.body));
});

app.post('/saveplaylist', (req, res) => {
  const { name, description, tracks } = req.body;
  spotifyApi
    .createPlaylist(name, { description: description, public: false })
    .then((data) => {
      const playlistID = data.body.id;
      const playlistTracks = [];
      tracks.forEach((track) => {
        playlistTracks.push(track.uri);
      });
      spotifyApi
        .addTracksToPlaylist(playlistID, playlistTracks)
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.post('/featured', (req, res) => {
  spotifyApi.getFeaturedPlaylists(req.body).then((data) => res.json(data));
});

app.post('/newreleases', (req, res) => {
  spotifyApi.getNewReleases(req.body).then((data) => res.json(data));
});
