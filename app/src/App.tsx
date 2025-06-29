import { useEffect, useState } from 'react'
import FileBrowser from './FileBrowser'
import { useLocation } from 'react-router-dom';
import type { SortingParams } from './types';
import SortingPanel from './SortingPanel';


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
      <h1 className='mt-3 mb-3'>File System {path}</h1>

      {path.endsWith('/') && <SortingPanel sorting={sorting} setSorting={setSorting} />}
      <FileBrowser path={path} sorting={sorting}/>
    </>
  )
}

export default App
