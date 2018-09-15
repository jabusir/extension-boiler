import { createStore, combineReducers } from 'redux';
import songsReducer from '../reducers/songsReducer';
import tokenReducer from '../reducers/tokenReducer';
import configReducer from '../reducers/configReducer';


export default () => {
    const store = createStore(
        combineReducers({
            songs: songsReducer,
            token: tokenReducer,
            config: configReducer,

        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};