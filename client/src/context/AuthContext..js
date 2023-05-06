import { createContext } from "react";

//функция, которая ничего не делает
const noop = () => {};

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthnticated: false,
});
