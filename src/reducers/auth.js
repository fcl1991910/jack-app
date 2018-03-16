import { LOGIN_ATEMPT, LOGIN_DONE, LOGIN_FAIL } from "../constants/actionTypes";

export default (
  state = {
    loading: false,
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
        loading: true
      };
    case LOGIN_DONE:
      return {
        ...state,
        loading: false,
        username: action.payload.username,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        login_fail: true,
        error_message: action.payload
      };
    default:
      return state;
  }
};
