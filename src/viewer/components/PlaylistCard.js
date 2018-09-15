import React from 'react';
import '../styles/playlist-card.css';
import { connect } from 'react-redux';
import { setSongs } from '../actions/songsActions';
import uuid from 'uuid/v4';

class PlaylistCard extends React.Component {
    handleClick = () => {
        const link = this.props.tracks.href;
        fetch(link, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        })
            .then((res)=> res.json())
            .then((res) => {
                const songs = res.items.map((item) => ({
                    image: item.track.album.images[0],
                    name: item.track.name,
                    artist: item.track.artists[0].name,
                    uri: item.track.uri,
                    duration: item.track.duration_ms,
                    id: uuid(),
                    votes: 0
                 }));
                this.props.dispatch(setSongs(songs));
                this.props.pushToPlaylist();
            })
            .catch((error) => console.log(error) )
    };

    render(){
        return(
            <div  onClick={this.handleClick }className='playlist-card'>
                <img src={this.props.images[0].url} alt="Say Bismillah Brother" />
                <div className='playlist-title'> {this.props.name} </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({ 
    token: state.token
})

export default connect(mapStateToProps)(PlaylistCard); 