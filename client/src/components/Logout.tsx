import { FC, useContext, useReducer } from "react";
import API from "../api/util";
import { AuthContext, initialState, reducer } from "../App";
import style from "./SignIn.module.css";

const Logout:FC = () => {



  
    const state : any= useContext(AuthContext);
    console.log("IN Logout",state);
    const [user,dispatch] = useReducer(reducer,initialState);
  
    return (
        <div className={style.SignIn}>
           { <button
        onClick={() =>
          dispatch({
            type: "LOGOUT",
            payload:{user:null}
          })
        }
      >
        {state.isAuthenticated && (
          <h1>Hi {state.user.uname} (LOGOUT)</h1>
        )}
      </button>}
        </div>
    );
}

export default Logout;