const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const clientId = 'f41c314e86ac49ecb7b7b4814823d0a3';
const clientSecret = '7b068651c33a49d881601d9d3ac9d3e5'; // Set env variables before production
// const redirectUri = 'https://localhost:8080/live_config.html';
const redirectUri = 'https://localhost:8081/spotify/callback';

router.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative streaming user-read-birthdate';
    res.redirect('https://accounts.spotify.com/authorize' + '?response_type=code' + '&client_id=' + clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') + '&redirect_uri=' + encodeURIComponent(redirectUri));
});

router.get('/token', (req, res) => {
    const code = req.query.code;
    const details = {
        'client_id': clientId,
        'client_secret': clientSecret,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': redirectUri
    };
    let formBody = [];
    for (let property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(`${encodedKey}=${encodedValue}`)
    }
    formBody = formBody.join('&');

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: formBody,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    })
        .then((response) => response.json())
        .then((response) => { 
            res.json(response);
        });
});

router.get('/callback', (req, res) => {
    const code = req.query.code;
    res.send(`<script>window.opener.postMessage('${code}', '*'); window.close()</script>`);
});

module.exports = router;