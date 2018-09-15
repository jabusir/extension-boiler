import React from 'react';
import { Route, Switch } from 'react-router-dom';

import VotingPage from '../components/VotingPage';
import PlaylistSelect from '../components/PlaylistSelect';
import Header from '../components/Header';
import PlayPage from '../components/PlayPage';

import '../styles/pages.css';
// window.Twitch.ext

class App extends React.Component {
    render() {
        return (
            <div>
                <Route path='/' component={Header} />
                <Switch>
                    <Route path='/' component={PlaylistSelect} exact />
                    <Route path='/voting' component={VotingPage} />
                    <Route path='/play' component={PlayPage} />
                </Switch>
            </div>
        )
    }
}

export default App;
