import React from 'react'
import { FilterByGenre } from '../FilterByGenre/FilterByGenre'
import { FilterByName } from '../FilterByName/FilterByName'
import { SortByAlphabet } from '../SortByAlphabet/SortByAlphabet'
import { SortByRating } from '../SortByRating/SortByRating'
import { useDispatch } from 'react-redux'
import { filterByGenre, filterByName, sortByAlphabet, sortByRating } from '../../Redux/Actions/actions'

export const Filters = ({genres}) => {
    const dispatch=useDispatch()

    const handleFilter=(e)=>{
        dispatch(filterByGenre(e.target.value))
    }

    const handleAlphabet = (e)=>{
        dispatch(sortByAlphabet(e.target.value))
    }

    const handleRating=(e)=>{
        dispatch(sortByRating(e.target.value))
    }

    const handleFilterName=(e)=>{
        dispatch(filterByName(e.target.value))
    }
  return (
    <div>
        <FilterByGenre genres={genres} onChange={handleFilter}/>
        <FilterByName onChange={handleFilterName}/>
        <SortByAlphabet onChange={handleAlphabet}/>
        <SortByRating onChange={handleRating}/>
    </div>
  )
}
