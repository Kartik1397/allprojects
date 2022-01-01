import { FC } from "react";
import style from "./SearchInput.module.css";

const SearchInput:FC = () => {
    return (
        <div className={style.SearchInput}>
            <input name="searc" id="search" placeholder="Search"/>
        </div>
    );
}

export default SearchInput;