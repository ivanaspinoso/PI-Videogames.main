import React from 'react'
import { Card } from '../Card/Card'
import { useSelector } from 'react-redux'

export const Cards = ({onClose}) => {
  const filteredVideogames= useSelector((state)=>state.filteredVideogames)


  return (
    <div>
      {filteredVideogames.map(videogame=>{
        return <Card
        key={videogame.id}
        id ={videogame.id}
        name={videogame.name}
        image={videogame.image}
        released={videogame.released}
        rating={videogame.rating}
        platforms={videogame.platforms}
        onClose={onClose}
        
        />
      })}
    </div>
  )
}
