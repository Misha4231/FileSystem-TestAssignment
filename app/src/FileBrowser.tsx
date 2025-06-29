import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "./config";
import { useNavigate } from "react-router-dom";

type FileBrowserProps = {
  path: string;
}
type File = {
    content: string;
    created_at: string;
    modified_at: string;
}

const FileBrowser = ({ path }: FileBrowserProps) => {    
    const navigate = useNavigate();
    const [currentFiles, setCurrentFiles] = useState<Array<string>>([])
    const [currentFileContent, setFileContent] = useState<File | null>(null)
    
    useEffect(() => {
        const fetchFilesListing = async () => {
            const response = await axios.get(`${API_HOST}/fs${path}`);
            
            if (path.endsWith('/')) {
                setCurrentFiles(response.data);
                setFileContent(null);
            } else {
                setCurrentFiles([]);
                setFileContent(response.data);
            }
            
        }
        
        fetchFilesListing()
    }, [path])

    return (
        <div>
            {path.endsWith('/') ? <ul className="list-group">
                {currentFiles.map((name, i) => (
                    <li key={i} onClick={() => {navigate(path + name)}} className="list-group-item list-group-item-action" style={style.listItem}>{name}</li>
                ))}
            </ul> : <div>
                <p className="mb-5">{currentFileContent?.content}</p>
                <span>Created at: {currentFileContent?.created_at}</span><br />
                <span>Modified at: {currentFileContent?.modified_at}</span>
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

