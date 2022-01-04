import { FC, useContext } from "react";
import { AuthContext } from "../App";

import MainLogo from "./MainLogo";
import SearchInput from "./SearchInput";
import SignIn from "./SignIn";
import Logout from "./Logout";

import style from "./Header.module.css";

const Header:FC = () => {
    const { state } : any= useContext(AuthContext);
    console.log("IN header",state);
    return (
        <header className={style.header}>
            <MainLogo />
            <SearchInput />
            {!state.isAuthenticated && <SignIn />}
            {state.isAuthenticated && <Logout />}
        </header>
    );
}

export default Header;