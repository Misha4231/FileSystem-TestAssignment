import axios from "axios";
import { useEffect, useState } from "react";
import { API_HOST } from "./config";
import { Link, useNavigate } from "react-router-dom";
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
    
    const deletePathHandler = async(name: string) => {
        await axios.delete(`${API_HOST}/fs${path}${name}`);
        setCurrentFiles(currentFiles.filter(n => n != name));
    }

    const updateFileHandler = async() => {
        await axios.put(`${API_HOST}/fs${path}`, {content: currentFileContent?.content})
    }

    return (
        <div>
            {path.endsWith('/') ? 
            (
                currentFiles.length === 0 ? 
                    <h2>Empty directory</h2> 
                    : 
                    <ul className="list-group">
                        {currentFiles.map((name, i) => (
                            <li key={i} className="list-group-item list-group-item-action" style={style.listItem}>
                                <strong className="p-1 fs-5" onClick={() => {navigate(path + name)}}>{name}</strong>
                                {!name.endsWith('/') && <Link to={path + name} className="p-1 fs-6 text-light text-decoration-none">Edit</Link>}
                                <span onClick={async() => await deletePathHandler(name)} className="p-1 fs-6 text-light">Delete</span>
                            </li>
                        ))}
                    </ul>
            ) 
            : 
            <div>
                <textarea 
                    value={currentFileContent?.content} 
                    onChange={e => setFileContent({...currentFileContent, content: e.target.value})}
                    className="mb-2 form-control" rows={3}>
                </textarea>
                <button onClick={updateFileHandler} type="button" className="btn btn-primary mb-3">Save</button><br />
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

