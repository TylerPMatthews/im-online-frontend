export const SET_LOGGEDIN = "SET_LOGGEDIN";
export const SET_LOGGEDOUT = "SET_LOGGEDOUT";
//Set logged in state
export const setLoggedIn = () => {
  return {
    type: SET_LOGGEDIN,
  };
};
//Set logged out state
export const setLoggedOut = () => {
  return {
    type: SET_LOGGEDOUT,
  };
};
