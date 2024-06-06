const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

if (!client_id || !client_secret) {
  throw new Error('Missing Spotify client ID or client secret');
}

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  method: 'post',
  headers: {
    'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: new URLSearchParams({
    grant_type: 'client_credentials'
  }).toString()
};

axios(authOptions)
  .then(response => {
    if (response.status === 200) {
      const token = response.data.access_token;
      console.log('Access token:', token);
    } else {
      console.error('Failed to obtain access token:', response.status, response.statusText);
    }
  })
  .catch(error => {
    console.error('Failed to obtain access token:', error);
  });
