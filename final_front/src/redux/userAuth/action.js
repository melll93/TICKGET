export const LOGIN = "user/LOGIN";
export const LOGOUT = "user/LOGOUT";

export const login = (user) => {
  return {
    type: LOGIN,
    user: { id: user.id, email: user.email, name: user.name },
    isLogin: true,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
    user: {
      id: "",
      email: "",
      name: "",
    },
    isLogin: false,
  };
};
