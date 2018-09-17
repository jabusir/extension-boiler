const defaultState = {
    token: '',
    expireTime: 0
};

export default (state = defaultState, action ) => { 
    switch(action.type){
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
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