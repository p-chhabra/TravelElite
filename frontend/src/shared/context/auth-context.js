import { createContext } from "react";

export const AuthContext = createContext({
  user: "",
  userID: null,
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
  setUser: () => {},
});
