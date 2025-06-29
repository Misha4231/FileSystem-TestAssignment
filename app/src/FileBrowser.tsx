import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "./config";

type FileBrowserProps = {
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>
}

const FileBrowser = ({ path, setPath }: FileBrowserProps) => {
    const [currentFiles, setCurrentFiles] = useState<Array<string>>([])

    useEffect(() => {
        const fetchFilesListing = async () => {
            const response = await axios.get(`${API_HOST}/fs/${path}`);
            setCurrentFiles(response.data);
        }
        
        fetchFilesListing()
    }, [path])

    return (
        <div>
            <ul className="list-group">
                {currentFiles.map((name, i) => (
                    <li key={i} onClick={() => {setPath(path + name)}} className="list-group-item list-group-item-action" style={style.listItem}>{name}</li>
                ))}
            </ul>
        </div>
    )
}

const style = {
    listItem: {
        cursor: 'pointer'
    }
}

export default FileBrowser

