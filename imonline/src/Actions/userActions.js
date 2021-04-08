export const SET_USERNAME = 'SET_USERNAME';
export const SET_USERID = 'SET_USERID';

export const setUsername = (username) => {
    return {
        type: SET_USERNAME,
        payload: username
    }
}
export const setUserID = (id) => {
    return {
        type: SET_USERID,
        payload: id
    }
}