import { useEffect, useState } from 'react'
import FileBrowser from './FileBrowser'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { SortingParams } from './types';
import SortingPanel from './SortingPanel';
import SearchInput from './SearchInput';
import axios from 'axios';
import { API_HOST } from './config';


function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const [path, setPath] = useState<string>(location.pathname)
  const [sorting, setSorting] = useState<SortingParams>({reverse: false, sort: ''})
  
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const currPath = location.pathname;
    if (path != currPath) setPath(currPath)

  }, [location.pathname])

  const createItem = async() => {
    await axios.post(`${API_HOST}/fs/${path}${newName}`);
    setNewName('');
    navigate(path + newName);
  }

  return (
    <>
      <div className="d-flex justify-content-between mt-3 mb-3">
        <h1><Link to='/' className='text-white text-decoration-none'>File System</Link> {path}</h1>
        <SearchInput/>
      </div>

      {path.endsWith('/') && <SortingPanel sorting={sorting} setSorting={setSorting} />}
      <FileBrowser path={path} sorting={sorting}/>

      {path.endsWith('/') && <div className="mt-3">
        <input
          onChange={e => setNewName(e.target.value)}
          value={newName}
          type="text" className='form-control' placeholder='Enter new file or folder (ends with /) name'
        />
        <button onClick={createItem} type='button' className='btn btn-primary mt-2'>Add</button>
      </div>
      }
    </>
  )
}

export default App
