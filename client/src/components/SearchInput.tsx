import { FC, useContext } from "react";
import style from "./SearchInput.module.css";
import API from "../api/util";
import { SearchResultContext } from '../pages/Home';

const SearchInput: FC = () => {
    const { dispatch }: any = useContext(SearchResultContext);
    return (
        <div className={style.SearchInput}>
            <input
                name="searc"
                onKeyDown={async (e) => {
                    if (e.key === 'Enter' || e.key === 'Tab') {
                        try {
                            await API.post("/project/search", { searchText: (e.target as HTMLInputElement)?.value }).then((res) => {
                                dispatch({type: 'UPDATE', payload: res?.data?.projects})
                                if (res.status === 200) {
                                    // if (res?.data?.projects?.length >= 1) {
                                    //     toast("Found " + res?.data?.projects?.length + " results for your search");
                                    // }
                                }
                            })
                        } catch (e) {
                            // toast("something went wrong with server...please try again");
                        }
                    }
                }}
                id="search"
                placeholder="Search"
            />
        </div>
    );
}

export default SearchInput;