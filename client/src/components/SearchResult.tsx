import { useContext } from "react";
import { SearchResultContext } from "../pages/Home";
import SearchProjectCard from '../components/SearchProjectCard';

const SearchResult = () => {
    const { searchResults, dispatch }: any = useContext(SearchResultContext);
    console.log(searchResults);
    return (
        <div style={{maxWidth: "60ch", margin: "10px auto", fontSize: "1.25rem", padding: "0 20px"}}>
            {searchResults.length > 0 && <div onClick={() => dispatch({type: ''})}>Close</div>}
            {
                searchResults.map((project: any) => <SearchProjectCard data={project} />)
            }
        </div>
    );
}

export default SearchResult;