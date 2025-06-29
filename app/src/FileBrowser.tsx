import axios from "axios";
import { useEffect, useState } from "react";
import { API_HOST } from "./config";
import { useNavigate } from "react-router-dom";
import type { FileBrowserProps, File } from "./types";


const FileBrowser = ({ path, sorting }: FileBrowserProps) => {    
    const navigate = useNavigate();
    const [currentFiles, setCurrentFiles] = useState<Array<string>>([])
    const [currentFileContent, setFileContent] = useState<File | null>(null)
    
    useEffect(() => {
        const fetchFilesListing = async () => {
            const response = await axios.get(`${API_HOST}/fs${path}?sort=${sorting.sort}&reserve=${sorting.reverse}`);
            
            if (path.endsWith('/')) {
                setCurrentFiles(response.data);
                setFileContent(null);
            } else {
                setCurrentFiles([]);
                setFileContent(response.data);
            }
        }
        
        fetchFilesListing()
    }, [path, sorting])

    return (
        <div>
            {path.endsWith('/') ? 
            (
                currentFiles.length === 0 ? 
                    <h2>Empty directory</h2> 
                    : 
                    <ul className="list-group">
                        {currentFiles.map((name, i) => (
                            <li key={i} onClick={() => {navigate(path + name)}} className="list-group-item list-group-item-action" style={style.listItem}>{name}</li>
                        ))}
                    </ul>
            ) 
            : 
            <div>
                <p className="mb-5">{currentFileContent?.content}</p>
                <span><strong>Size:</strong> {currentFileContent?.size} B</span><br />
                <span><strong>Created at:</strong> {currentFileContent?.created_at}</span><br />
                <span><strong>Modified at:</strong> {currentFileContent?.modified_at}</span>
            </div>
            }
        </div>
    )
}

const style = {
    listItem: {
        cursor: 'pointer'
    }
}

export default FileBrowser

