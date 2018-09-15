import React from 'react';
import ReactDOM from 'react-dom';
import ConfigPage from '../components/ConfigPage';

const authWindow = window.open('https://localhost:8081/spotify/login', '_blank', 'width=500,height=500');
window.addEventListener('message', (e) => {
    const code = e.data;
    console.log(code);
});

ReactDOM.render(<ConfigPage />, document.getElementById('twitch-extension-config'));