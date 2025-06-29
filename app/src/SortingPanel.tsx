import type { SortingPanelProps } from "./types"


const SortingPanel = ({ sorting, setSorting }: SortingPanelProps) => {
  return (
    <div className='mb-4'>
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
    </div>
  )
}

export default SortingPanel