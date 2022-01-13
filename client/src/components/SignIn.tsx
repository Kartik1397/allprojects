import { FC, useContext } from "react";
import { AuthContext } from "../App";
import UserAvatar from "./UserAvatar";
import style from "./SignIn.module.css";
import DropDownMenu from "./DropDownMenu";
import API from "../api/util";
import { Link } from "react-router-dom";

const SignIn: FC = () => {
    const { state }: any = useContext(AuthContext);

    const handleLogout = () =>{
        API.delete("/auth/api/v1/logout").then((res)=>{
            window.location.reload(); 
        });
    }
    
    return (
        <div className={style.SignIn}>
            {
                state.isAuthenticated
                ?
                    <DropDownMenu
                        icon={<UserAvatar imageSrc={state?.user?.image} username={state?.user?.uname}/>}
                        menuItems={[<Link to='/profile'>Profile</Link>, <div onClick={handleLogout}>Logout</div>]}
                    />
                :
                    <>
                        <div id="g_id_onload"
                            data-client_id="496941184973-m0q8g3uns4uo9lgll6r9mq4jfh703a6j.apps.googleusercontent.com"
                            data-login_uri={`${process.env.REACT_APP_API_URL}/auth/api/google`}
                            data-auto_prompt="false">
                        </div>
                        <div className="g_id_signin"
                            data-type="standard"
                            data-size="large"
                            data-theme="outline"
                            data-text="sign_in_with"
                            data-shape="rectangular"
                            data-logo_alignment="left">
                        </div>
                    </>
            }
        </div>
    );
}

export default SignIn;
