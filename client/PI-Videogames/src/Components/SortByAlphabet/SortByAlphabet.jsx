import React from 'react'
import { useDispatch } from 'react-redux'
import { sortByAlphabet } from '../../Redux/Actions/actions'

export const SortByAlphabet = () => {
    const dispatch=useDispatch()

    const handleSort=(payload)=>{
        dispatch(sortByAlphabet(payload))
    }

  return (
    <div>
        <label htmlFor="sortByAlphabet">Sort by alphabet</label>
        <select id="sortByAlphabet" onChange={(e)=>handleSort(e.target.value)}>
        <option value="">Default</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
        </select>
    </div>
  )
}
