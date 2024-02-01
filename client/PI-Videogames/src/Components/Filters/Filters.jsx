import React from 'react'
import { FilterByGenre } from '../FilterByGenre/FilterByGenre'
import { SortByAlphabet } from '../SortByAlphabet/SortByAlphabet'
import { SortByRating } from '../SortByRating/SortByRating'
import { useDispatch } from 'react-redux'
import { filterByGenre, sortByAlphabet, sortByRating } from '../../Redux/Actions/actions'
import { getVideogames } from '../../Redux/Actions/actions'
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

    const handleClearFilters = () => {
        dispatch(filterByGenre(''));
        dispatch(sortByAlphabet(''));
        dispatch(sortByRating(''));
        dispatch(getVideogames());
      };

  return (
    <div className={s.container}>
        <FilterByGenre genres={genres} onChange={handleFilter}  className={s.filter}/>
        <SortByAlphabet onChange={handleAlphabet}  className={s.filter}/>
        <SortByRating onChange={handleRating}  className={s.filter}/>
        <button onClick={handleClearFilters} className={s.clearButton}>
        Clear Filters
      </button>
    </div>
  )
}
