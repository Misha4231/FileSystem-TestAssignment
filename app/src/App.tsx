import { useState } from 'react'
import FileBrowser from './FileBrowser'

function App() {
  const [path, setPath] = useState<string>('')

  return (
    <>
      <h1 className='mt-3 mb-3'>File System {path ? path : '/'}</h1>

      <FileBrowser path={path} setPath={setPath}/>
    </>
  )
}

export default App
