import { LOGIN, LOGOUT } from '../actions/index';

const loginReducer = (
  state = {
    isLogin: false,
    isAdmin: false,
    isOauth: false,
    id: null,
    nickname: null,
    email: null,
  },
  action
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: action.payload.isLogin,
        isAdmin: action.payload.isAdmin,
        isOauth: action.payload.oauth,
        id: action.payload.id,
        nickname: action.payload.nickname,
        email: action.payload.email
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        isAdmin: false,
        isOauth: false,
        id: null,
        nickname: null,
        email: null
      };

    default:
      return state;
  }
};

export default loginReducer;