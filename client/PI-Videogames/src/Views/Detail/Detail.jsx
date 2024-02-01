import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { videogameDetail } from '../../Redux/Actions/actions'
import "./Detail.css"
import { Navbar } from '../../Components/Navbar/Navbar'

export const Detail = () => {
 
const dispatch=useDispatch() 
const params= useParams()
const {id}= params
const gameDetail = useSelector(state=>state.videogameDetail)

useEffect(()=>{ 
  
  dispatch(videogameDetail(id))
}, [dispatch, id])


  return (
    <div className="detail-container">
       <Navbar />
       
       <div className="detail-info"> {gameDetail ?( <div>
     <h3>{gameDetail.name}</h3>
     <img src={gameDetail.background_image} alt={gameDetail.name} className="detail-image" />
     <h2>About this game:</h2>
     <p> {gameDetail.description.replace(/(<([^>]+)>)/ig, '')}</p>
     <p>{gameDetail.genres ? gameDetail.genres.join(', ') : 'No genres available'}</p>
     <p>{`Platforms: ${typeof gameDetail.platforms === 'string' ? gameDetail.platforms : gameDetail.platforms.join(', ')}`}</p>
     <p>{gameDetail.released}</p>
     <p>{gameDetail.rating}</p>
     </div>
     ) : ( <h1 className="loading">Cargando</h1>
     )}
     </div>
    </div>
  )
}
