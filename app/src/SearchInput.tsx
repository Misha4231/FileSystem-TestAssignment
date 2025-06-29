import axios from "axios";
import { useEffect, useState } from "react"
import { API_HOST } from "./config";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const navigate = useNavigate();

    const [searchKey, setSearchKey] = useState<string>('');
    const [foundResults, setFoundResults] = useState<Array<string>>([])

    useEffect(() => {
        if (searchKey == '') {
            setFoundResults([]);
            return;
        }

        const fetchPaths = async() => {
            const response = await axios.get(`${API_HOST}/search/?path=${searchKey}`);
            setFoundResults(response.data);
        }
        
        fetchPaths();
    }, [searchKey])

    return (
        <div className="position-relative w-full">
            <input 
                value={searchKey} 
                onChange={(e) => setSearchKey(e.target.value)} 
                type="text" className="form-control" placeholder="Search..."
            />
            {foundResults.length > 0 && (
                <div className="position-absolute bg-dark rounded shadow p-2 z-1 overflow-y-scroll" style={{maxHeight: 300, width: '100%', cursor: 'pointer'}}>
                    {foundResults.map((item, index) => (
                        <div onClick={() => {
                                navigate('/' + item);
                                setFoundResults([]);
                            }} 
                            className="mt-1" key={index}>{item}</div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchInput