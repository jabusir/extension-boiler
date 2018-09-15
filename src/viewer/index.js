import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { setToken } from './actions/tokenActions';
import { setDeviceId } from './actions/configActions';
import './styles/pages.css';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

const token = localStorage.getItem('token');
if (!token) {
    window.location.href = "http://localhost:3001/spotify/login";
    fetch("/spotify/token")
        .then((res) => res.json())
        .then((token) => {
            localStorage.setItem('token', token);
            store.dispatch(setToken(token));
            loadScript(store.getState().token);
        })
} else {
    store.dispatch(setToken(token));
    loadScript(store.getState().token);
}


function setupPlayer(authToken) {
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = authToken;
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(token); }
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            store.dispatch(setDeviceId(device_id));
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
    };
}

function loadScript(authToken) {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.addEventListener('load', setupPlayer(authToken));
    document.body.appendChild(script);
}

ReactDOM.render(jsx, document.getElementById('twitch-extension-viewer'));
