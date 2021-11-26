export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (state) => {
  return {
    type: LOGIN,
    payload: {
      isLogin: state.isLogin,
      isAdmin: state.isAdmin,
      isOauth: state.isOauth,
      id: state.id,
      nickname: state.nickname,
      email: state.email
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};