import { LOGIN_USER, LOGOUT_USER } from "../ActionTypes";

const initState = {
  isLoggedIn: false,
  currentUser: null,
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem("userName", action.payload);
      return {
        ...state,
        currentUser: action.payload,
        isLoggedIn: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default loginReducer;
