//importar las action-types
import { GET_VIDEOGAMES,SEARCH_BY_NAME,VIEW_VIDEOGAME_DETAIL,FILTER_BY_GENRE,FILTER_BY_NAME, SORT_BY_ALPHABET,SORT_BY_RATING } from "../Actions/actions-types";

//definir el initialState:
let initialState={
    videogameDetail:null, // detalles de un videojuego especifico
    videoGames:[], // lista de todos los videojuegos
    filteredVideogames:[], //lista de videojuegos filtrados
}

//definir la funcion roorReducer

function roorReducer(state=initialState,  { type, payload }){
   switch (type){
    case GET_VIDEOGAMES:
        return{...state,videoGames:payload};

    case SEARCH_BY_NAME:
        return{...state,filteredVideogames:payload, videoGames:payload}  
        
    case VIEW_VIDEOGAME_DETAIL:
        return{...state,videogameDetail:payload}
        
    case FILTER_BY_GENRE:
        return{...state, filteredVideogames:payload}
        
    case FILTER_BY_NAME:
        return{...state, filteredVideogames:payload}
        
    case SORT_BY_ALPHABET:
        return{...state, videoGames:payload, filteredVideogames:payload}
        
    case SORT_BY_RATING:
        return{...state, videoGames:payload, filteredVideogames:payload}    

   }

   
}

export default roorReducer;