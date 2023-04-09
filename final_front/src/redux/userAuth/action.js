export const LOGIN = "user/LOGIN";
export const LOGOUT = "user/LOGOUT";

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
