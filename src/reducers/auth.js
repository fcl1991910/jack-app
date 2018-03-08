import { LOGIN } from "../constants/actionTypes";

export default (state={}, action) => {
  switch(action.type){
    case LOGIN:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
