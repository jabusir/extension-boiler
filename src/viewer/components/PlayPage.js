import React from 'react';
import { connect } from 'react-redux'
import '../styles/play-page.css';
import numeral from 'numeral';

class PlayPage extends React.Component {
    state = {
        currentSong: undefined,
        seconds: 0
    };

    componentDidMount() {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.props.deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [this.props.songUri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }
        })
            .then(() => {
                const currentSong = this.props.songs.filter((song) => song.uri === this.props.songUri)[0];
                this.setState(() => ({
                    currentSong: currentSong,
                    seconds: Math.floor(currentSong.duration/1000)
                }));
                setInterval(() => {this.setState((prevState) => ({seconds: prevState.seconds -1}))}, 1000)
                setTimeout(() => { this.props.history.push('/voting') }, currentSong.duration);
                console.log(currentSong.duration);
            })

            .catch((err) => { console.log(err) });
    }

    render() {
        if (this.state.currentSong){
            return (
                <div className="page play-container">
                    <img className="song-image" src={this.state.currentSong.image.url} alt={this.state.currentSong.name} />
                    <div className="song-info">
                        <div className="song-info__name"> {this.state.currentSong.name} </div>
                        <div className="song-artist">{this.state.currentSong.artist}</div>
                        <div className="song-time">{Math.floor(this.state.seconds / 60) }:{numeral(this.state.seconds - (Math.floor(this.state.seconds / 60) * 60)).format('00')}</div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => ({
    deviceId: state.config.deviceId,
    songUri: state.config.song,
    token: state.token.token,
    songs: state.songs
});

export default connect(mapStateToProps)(PlayPage);

