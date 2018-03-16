import { LOGIN_ATEMPT, LOGIN_DONE, LOGIN_FAIL } from "../constants/actionTypes";

export default (
  state = {
    logging: false,
    login_fail: false,
    access_token: "",
    refresh_token: ""
  },
  action
) => {
  switch (action.type) {
    case LOGIN_ATEMPT:
      return {
        ...state,
        logging: true
      };
    case LOGIN_DONE:
      return {
        ...state,
        logging: false,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token
      };
    case LOGIN_FAIL:
      return {
        ...state,
        logging: false,
        login_fail: true,
        error_message: action.payload
      };
    default:
      return state;
  }
};
