export const LOGIN = "user/LOGIN";
export const LOGOUT = "user/LOGOUT";
export const SETUSER = "user/SETUSER";
export const reduxLogin = (user) => {
  return {
    type: LOGIN,
    user: user,
    isLogin: true,
  };
};
export const reduxLogout = () => {
  return {
    type: LOGOUT,
    user: {},
    isLogin: false,
  };
};
export const setUserId = (user) => {
  return {   type: SETUSER,
    user: user,   isLogin: false,
  };
};