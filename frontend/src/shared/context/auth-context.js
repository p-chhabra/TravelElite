import { createContext } from "react";

export const AuthContext = createContext({
    user: "",
    isLoggedIn: false,
    login: ()=>{},
    logout: ()=>{},
    setUser: ()=>{}
});