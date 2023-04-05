export const LOGIN = "user/LOGIN";
export const LOGOUT = "user/LOGOUT";

export const login = (user) => {
  return {
    type: LOGIN,
    user: user,
    isLogin: true,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
    user: {},
    isLogin: false,
  };
};
