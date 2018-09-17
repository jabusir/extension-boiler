const defaultState = {
    token: '',
    refreshToken: '',
    expireTime: ''
};

export default (state = defaultState, action ) => { 
    switch(action.type){
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_REFRESH_TOKEN':
            return {
                ...state,
                refreshToken: action.refreshToken
            };
        case 'SET_EXPIRE_TIME':
            return {
                ...state,
                expireTime: action.expireTime
            }
        default:
            return state;
    }
}