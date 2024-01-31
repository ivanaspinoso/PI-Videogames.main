import React from 'react'
import { FilterByGenre } from '../FilterByGenre/FilterByGenre'
import { SortByAlphabet } from '../SortByAlphabet/SortByAlphabet'
import { SortByRating } from '../SortByRating/SortByRating'
import { useDispatch } from 'react-redux'
import { filterByGenre, sortByAlphabet, sortByRating } from '../../Redux/Actions/actions'
import s from "./Filters.module.css"

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

    // const handleFilterName=(e)=>{
    //     dispatch(filterByName(e.target.value))
    // }
  return (
    <div className={s.container}>
        <FilterByGenre genres={genres} onChange={handleFilter}  className={s.filter}/>
        {/* <FilterByName onChange={handleFilterName}/> */}
        <SortByAlphabet onChange={handleAlphabet}  className={s.filter}/>
        <SortByRating onChange={handleRating}  className={s.filter}/>
    </div>
  )
}
