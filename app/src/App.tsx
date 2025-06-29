import { useEffect, useState } from 'react'
import FileBrowser from './FileBrowser'
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation()
  const [path, setPath] = useState<string>(location.pathname)

  useEffect(() => {
    const currPath = location.pathname;
    if (path != currPath) setPath(currPath)

  }, [location.pathname])

  return (
    <>
      <h1 className='mt-3 mb-3'>File System {path}</h1>

      <FileBrowser path={path}/>
    </>
  )
}

export default App
