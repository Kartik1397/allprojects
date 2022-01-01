import { FC } from "react";
import style from "./MainLogo.module.css";
import { Link } from "react-router-dom";

const MainLogo:FC = () => {
    return <div className={style.MainLogo}><Link to="/">PROJECTS</Link></div>;
}

export default MainLogo;
