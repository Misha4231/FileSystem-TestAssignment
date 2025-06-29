import { useEffect, useState } from 'react'
import FileBrowser from './FileBrowser'
import { Link, useLocation } from 'react-router-dom';
import type { SortingParams } from './types';
import SortingPanel from './SortingPanel';
import SearchInput from './SearchInput';


function App() {
  const location = useLocation()

  const [path, setPath] = useState<string>(location.pathname)
  const [sorting, setSorting] = useState<SortingParams>({reverse: false, sort: ''})
  
  useEffect(() => {
    const currPath = location.pathname;
    if (path != currPath) setPath(currPath)

  }, [location.pathname])

  return (
    <>
      <div className="d-flex justify-content-between mt-3 mb-3">
        <h1><Link to='/' className='text-white text-decoration-none'>File System</Link> {path}</h1>
        <SearchInput/>
      </div>

      {path.endsWith('/') && <SortingPanel sorting={sorting} setSorting={setSorting} />}
      <FileBrowser path={path} sorting={sorting}/>
    </>
  )
}

export default App
