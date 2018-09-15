import React from 'react';
import ReactDOM from 'react-dom';

// Get code from url query
const url = window.location.href;
const code = url.split('?')[1].split('=')[1];
// Exchange code for token to use in all future requests to spotify
fetch(`https://localhost:8081/spotify/token?code=${code}`)
    .then(res => res.json())
    .then(res => console.log(res));

const jsx = (
    <div>
        Live Config
    </div>
);

ReactDOM.render(jsx, document.getElementById('twitch-extension-live-config'));