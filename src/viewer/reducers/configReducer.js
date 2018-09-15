export default (state = {}, action ) => {
    switch(action.type){
        case 'SET_TRACK_REQUEST':
            return {
                ...state,
                trackRequest: action.trackRequest
                }
        case 'SET_URI':
                return {
                    ...state,
                    song: action.uri
                }
        case 'SET_DEVICE_ID':
                return {
                    ...state,
                    deviceId: action.deviceId
                };
        default:
            return state 
    }
}