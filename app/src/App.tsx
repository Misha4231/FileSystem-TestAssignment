import { useEffect, useState } from 'react'
import FileBrowser from './FileBrowser'
import { useLocation } from 'react-router-dom';
import type { SortingParams } from './types';


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

      {path.endsWith('/') && <div className='mb-4'>
        <select className="form-select" value={sorting.sort} onChange={v => setSorting({...sorting, sort: v.target.value})}>
          <option value=''>Choose parameter by which you want to sort</option>
          <option value="name">Name</option>
          <option value="size">Size</option>
        </select>
        <div className="form-check mt-1">
          <label className='form-check-label' htmlFor="reverse">Reverse</label>
          <input 
            disabled={sorting.sort == ''}
            type="checkbox" id='reverse' className='form-check-input' 
            checked={sorting.reverse} 
            onChange={v => setSorting({...sorting, reverse: v.target.checked})} 
          />
        </div>
      </div>}

      <FileBrowser path={path} sorting={sorting}/>
    </>
  )
}

export default App
