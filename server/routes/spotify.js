const express = require('express');
const fetch = require('node-fetch');
const URI = require('urijs');

const router = express.Router();

const CLIENT_ID = 'f41c314e86ac49ecb7b7b4814823d0a3';
const CLIENT_SECRET = '7b068651c33a49d881601d9d3ac9d3e5'; // Set env variables before production
// const REDIRECT_URI = 'https://localhost:8080/live_config.html';
const REDIRECT_URI = 'https://localhost:8081/spotify/callback';
const SCOPES_STR = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative streaming user-read-birthdate';

router.get('/login', (req, res) => {

    res.redirect(URI('https://accounts.spotify.com/authorize').setQuery({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPES_STR || '',
        redirect_uri: REDIRECT_URI
    }));

});

router.get('/token', async (req, res) => {

    const code = req.query.code;

    const reply = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: URI.buildQuery({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });

    const payload = await reply.json();
    res.json(payload);

});

router.get('/callback', (req, res) => {
    const code = req.query.code;
    res.send(`<script>window.opener.postMessage({ type: 'ours', code: '${code}' }, '*'); window.close()</script>`);

});

module.exports = router;
