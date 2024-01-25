import React from 'react'
import { useDispatch } from 'react-redux'
import { filterByName } from '../../Redux/Actions/actions'

export const FilterByName = () => {
    const dispatch=useDispatch()

    const handleFilter=(input)=>{
        dispatch(filterByName(input))
    }

    

  return (
    <div>
    <label htmlFor="filterByName">Filter by Name</label>
    <input type="text" id="filterByName" onChange={(e)=>handleFilter(e.target.value)} />
    </div>
  )
}
