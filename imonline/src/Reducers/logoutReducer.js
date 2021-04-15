import { SET_LOGGEDIN, SET_LOGGEDOUT } from "../Actions/logoutActions";
const initialState = {
  loggedIn: false,
};

const LogoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGEDIN:
      return {
        ...state,
        loggedIn: true,
      };
    case SET_LOGGEDOUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};
export default LogoutReducer;
