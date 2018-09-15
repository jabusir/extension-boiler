import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import VotingPage from '../components/VotingPage';
import PlaylistSelect from '../components/PlaylistSelect';
import Header from '../components/Header';
import PlayPage from '../components/PlayPage';

const AppRouter = () => (
    <BrowserRouter> 
        <div>
            <Route path='/' component={Header} />
            <Switch>
                <Route path='/' component={PlaylistSelect} exact />
                <Route path='/voting' component={VotingPage} />
                <Route path='/play' component={PlayPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
