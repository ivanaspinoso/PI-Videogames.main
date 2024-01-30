import React from 'react'
import { useDispatch } from 'react-redux'
import { filterByGenre } from '../../Redux/Actions/actions'

export const FilterByGenre = () => {
  const dispatch=useDispatch()

  const handleFilter =(genres)=>{
    dispatch(filterByGenre(genres))
  }

  return (
    <div>
      <label htmlFor="filterByGenre">Filter by genre</label>
      <select id="filterByGenre" onChange={(e)=> handleFilter(e.target.value)}>     
                    <option value=''>Default</option>
                    <option value="Action">Action</option>
                    <option value="Indie">Indie</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Racing">Racing</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Sports">Sports</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Educational">Educational</option>
                    <option value="Card">Card</option>
      </select>
    </div>
  )
}
