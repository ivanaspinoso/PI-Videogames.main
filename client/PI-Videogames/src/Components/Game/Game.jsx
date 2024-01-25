import React from 'react'
import { Link } from 'react-router-dom'

export const Game = ({name, background_image, rating, id, genres}) => {
    const formattedRating = rating ? rating.toFixed(1):null
  return (
    <div>
        <Link to={`/videogame/${id}`} >
        <span>{formattedRating}</span>
        <h5>{name}</h5>
        <img src={background_image} alt={name} />
        </Link>
    </div>
  )
}
