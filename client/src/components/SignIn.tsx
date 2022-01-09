import { FC, useContext } from "react";
import { AuthContext } from "../App";
import style from "./SignIn.module.css";

const SignIn:FC = () => {
    const state :any= useContext(AuthContext);
    return (
        <div className={style.SignIn}>
            <span className={style.Button}>Sign Up</span> / <span className={style.Button}>Sign In</span>
            {!state.isAuthenticated && <div id="g_id_onload"
     data-client_id="496941184973-m0q8g3uns4uo9lgll6r9mq4jfh703a6j.apps.googleusercontent.com"
     data-context="signin"
     data-login_uri={`${process.env.REACT_APP_API_URL}/auth/api/google`}></div>}
        </div>
    );
}

export default SignIn;

