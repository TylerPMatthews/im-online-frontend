import { combineReducers } from "redux";
import userReducer from './userReducer';
import logoutReducer from './logoutReducer';

const rootReducer = combineReducers({
user: userReducer,
sign: logoutReducer,
});
export default rootReducer;
