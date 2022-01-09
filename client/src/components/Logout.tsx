import { FC, useContext } from "react";
import { AuthContext } from "../App";
import style from "./SignIn.module.css";

const Logout: FC = () => {
  const { state, dispatch }: any = useContext(AuthContext);

  return (
    <div className={style.SignIn}>
      {
        <button
          onClick={() =>
            dispatch({
              type: "LOGOUT",
              payload: { user: null }
            })
          }
        >
          {state.isAuthenticated && (
            <h1>Hi {state.user.uname} (LOGOUT)</h1>
          )}
        </button>
      }
    </div>
  );
}

export default Logout;