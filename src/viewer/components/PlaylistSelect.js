import React from 'react';
import { connect } from 'react-redux';
import PlaylistCard from './PlaylistCard';
import '../styles/pages.css'

class PlaylistSelect extends React.Component {
    state = {
        playlists: []
    }

    pushToPlaylist = () => {
        this.props.history.push('/voting');
    }

    componentDidMount(){
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error('u don deserv');
                }
            })
            .then((res) => this.setState(() => ({playlists: res.items})))
            .catch((error) => console.log(error))
    }
    render(){
        return(
            <div className="page" >
                {this.state.playlists && this.state.playlists.map((playlist) => <PlaylistCard pushToPlaylist={this.pushToPlaylist} key={playlist.id} {...playlist} />)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ token : state.token.token })

export default connect(mapStateToProps)(PlaylistSelect);