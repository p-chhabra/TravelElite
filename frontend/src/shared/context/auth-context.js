import { createContext } from "react";

export const AuthContext = createContext({
    user: "",
    userID: null,
    isLoggedIn: false,
    login: ()=>{},
    logout: ()=>{},
    setUser: ()=>{},
});