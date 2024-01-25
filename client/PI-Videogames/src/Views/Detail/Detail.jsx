import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { videogameDetail } from '../../Redux/Actions/actions'
import { Navbar } from '../../Components/Navbar/Navbar'

export const Detail = () => {
 
const dispatch=useDispatch() //Inicializa el hook dispatch para despachar acciones de Redux.
const params= useParams() //Obtiene los parámetros de la URL, en este caso, el id
const {id}= params
const gameDetail = useSelector(state=>state.videogameDetail)//Selector que obtiene el estado videogameDetail de la tienda Redux

useEffect(()=>{ //: Hook que se ejecuta después de que el componente es montado.
  
  dispatch(videogameDetail(id))//Cuando id cambia, se despacha la acción videogameDetail para obtener los detalles del videojuego.
}, [dispatch, id])


  return (
    <div>
       <h1>Videojuegos</h1>
       <div> {gameDetail ?( <div>
     <h3>{gameDetail.name}</h3>
     <h2>About this game:</h2>
     <p> {gameDetail.description.replace(/(<([^>]+)>)/ig, '')}</p>
     <p>{gameDetail.genres ? gameDetail.genres.join(', ') : 'No genres available'}</p>
     <p>{`Platforms: ${typeof gameDetail.platforms === 'string' ? gameDetail.platforms : gameDetail.platforms.join(', ')}`}</p>
     <p>{gameDetail.released}</p>
     <p>{gameDetail.rating}</p>
     </div>
     ) : ( <h1>Cargando</h1>
     )}
     </div>
    </div>
  )
}
