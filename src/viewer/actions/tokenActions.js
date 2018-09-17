
export const setToken = (token) => ({
    type: 'SET_TOKEN',
    token
});

export const setRefreshToken = (refreshToken) => ({
    type: 'SET_REFRESH_TOKEN',
    refreshToken
});

export const setExpireTime = (expireTime) => ({
    type: 'SET_EXPIRE_TIME',
    expireTime
});