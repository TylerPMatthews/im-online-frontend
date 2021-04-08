import { SET_USERNAME, SET_USERID } from "../Actions/userActions";
const initialState = {
  user_username: "",
  user_id: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        user_username: action.payload,
      };
    case SET_USERID:
      return {
        ...state,
        user_id: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
