import { FC, useState } from 'react';
import Header from "../../components/Header";
import BasicTabs from '../../components/tabs';




const DashBoard:FC = () => {
    const [searchInput,setSearchInput] = useState("");
    const  [searchResults,setSearchResults] = useState([]);
    

    return (
        <div>
            <Header searchInput={searchInput} setSearchInput={setSearchInput} setSearchResults={setSearchResults}/>
            <BasicTabs searchResults={searchResults} />
        </div>
    );
}

export default DashBoard;