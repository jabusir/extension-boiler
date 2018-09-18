import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import VotingPage from '../components/VotingPage';
import PlaylistSelect from '../components/PlaylistSelect';
import Header from '../components/Header';
import PlayPage from '../components/PlayPage';

import '../styles/pages.css';
// window.Twitch.ext

class App extends React.Component {
    render() {
        console.log('App mounted');
        return (
            <BrowserRouter basename="viewer.html">
                <div>
                    <Route path='/' component={Header} />
                    <Switch>
                        <Route path='/' component={PlaylistSelect} exact />
                        <Route path='/voting' component={VotingPage} />
                        <Route path='/play' component={PlayPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
