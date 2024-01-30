import React from 'react'
import { useDispatch } from 'react-redux'
import { sortByRating } from '../../Redux/Actions/actions'

export const SortByRating = () => {
    const dispatch=useDispatch()

    const handleSort = (payload) => {
        // Mapea 'high' y 'less' a 'asc' y 'desc' respectivamente
        const sortOrder = payload === 'less' ? 'desc' : 'asc';
        dispatch(sortByRating(sortOrder));
      };
      
      
  return (
    <div>
        <label htmlFor="sortByRating">Sort by rating</label>
        <select id="sortByRating" onChange={(e)=>handleSort(e.target.value)}>
                    <option value="">Default</option>
                    <option value="high">Highest Rated ★</option>
                    <option value="less">Less Rated ☆</option>
        </select>
    </div>
  )
}
