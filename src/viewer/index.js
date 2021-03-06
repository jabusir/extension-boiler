import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import { setToken, setRefreshToken, setExpireTime } from './actions/tokenActions';
import { setDeviceId } from './actions/configActions';

export const store = configureStore();

const authWindow = window.open('https://localhost:8081/spotify/login', '_blank', 'width=500,height=500');
window.addEventListener('message', (e) => {
    const message = e.data
    if (message.type && message.type === 'ours') {
        fetch(`https://localhost:8081/spotify/token?code=${message.code}`)
        .then((res) => res.json())
        .then((res) => {
           let { access_token, expires_in, refresh_token } = res;
           store.dispatch(setToken(access_token));
           store.dispatch(setExpireTime(expires_in));

           loadScript(access_token);
           setRefreshInterval(refresh_token);
           
           ReactDOM.render((
            <Provider store={store}>
                <App />
            </Provider>
            ), document.getElementById('twitch-extension-viewer'));        
        });
    }
});


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

function setRefreshInterval(refresh_token) {
    console.log('setting interval')
    setInterval(() => {
        fetch(`https://localhost:8081/spotify/refresh?refresh_token=${refresh_token}`)
         .then((res) => res.json())
         .then((res) => {
             console.log(res);
             const { access_token, expires_in } = res
             store.dispatch(setToken(access_token));
             store.dispatch(setExpireTime(expires_in));
         })
         .catch((err) => console.log(err));
    }, store.getState().token.expireTime * 1000 - 2000);
}