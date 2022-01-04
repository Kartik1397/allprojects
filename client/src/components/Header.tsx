import { FC, useReducer } from "react";
import MainLogo from "./MainLogo";
import SearchInput from "./SearchInput";
import SignIn from "./SignIn";
import style from "./Header.module.css";
import Logout from "./Logout";
import { useContext } from "react";
import { AuthContext, initialState, reducer } from "../App";

const Header:FC = () => {
    // const state = useContext(AuthContext);
    // console.log("header",state);
    // const [state,dispatch] = useReducer(reducer,initialState);

    const state : any= useContext(AuthContext);
    console.log("IN header",state);
    return (
        <header className={style.header}>
            <MainLogo />
            <SearchInput />
            {!state.isAuthenticated && <SignIn  />}
            {state.isAuthenticated && <Logout/>}
        </header>
    );
}

export default Header;