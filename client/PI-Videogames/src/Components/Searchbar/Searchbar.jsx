import React from 'react'
import { useDispatch } from 'react-redux'

export const Searchbar = () => {
    const dispatch = useDispatch();

    const[state, setState]= useState("")

    const handleChange =(e)=>{
        setState(e.target.value)
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
        dispatch(searchGame(state))
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" />
            <input type="submit" />
        </form>
    </div>
  )
}
//searchBar: un input de búsqueda para encontrar videojuegos por nombre.