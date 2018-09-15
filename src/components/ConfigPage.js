import React from 'react';

class ConfigPage extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.grantSpotify}>Grant Jukebox.io Spotify Access</button>
            </div>
        );
    }

    grantSpotify() {
        window.open('https://localhost:8081/spotify/login', '_blank', 'width=500,height=500');
    }
}

export default ConfigPage;
