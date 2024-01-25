//importar las action-types
import { GET_VIDEOGAMES,SEARCH_BY_NAME,VIEW_VIDEOGAME_DETAIL,FILTER_BY_GENRE,FILTER_BY_NAME, SORT_BY_ALPHABET,SORT_BY_RATING } from "../Actions/actions-types";

//definir el initialState:
let initialState={
    videogameDetail:null, // detalles de un videojuego especifico
    videoGames:[], // lista de todos los videojuegos
    filteredVideogames:[], //lista de videojuegos filtrados
}

//definir la funcion rootReducer

function rootReducer(state=initialState, action){
   switch (action.type){
    case GET_VIDEOGAMES:
        return{...state,videoGames:action.payload, filteredVideogames:action.payload};

    case SEARCH_BY_NAME:
        return{...state,filteredVideogames:action.payload}  
        
    case VIEW_VIDEOGAME_DETAIL:
        return{...state,videogameDetail:action.payload}

    case FILTER_BY_GENRE:
        if (action.payload===undefined)
        return{...state, filteredVideogames:action.payload}

        const filterByGenre= state.videoGames.filter((fil)=>fil.genres.includes(action.payload))
        return {
            ...state,
            filteredVideogames: filterByGenre, 
        }
    
        
    case FILTER_BY_NAME:
        if(action.payload===undefined)
        return{...state, filteredVideogames:state.videoGames}

        const filteredByname = state.videoGames.filter((filtered)=>filtered.name.toLowerCase().includes(action.payload.toLowerCase()))
        return {
            ...state,
            filteredVideogames:filteredByname,
        }


    case SORT_BY_ALPHABET:
        const sortedVideogames = [...state.filteredVideogames].sort((a, b) =>
        action.payload === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
     );
     return { ...state, filteredVideogames: sortedVideogames };
        
    case SORT_BY_RATING:
        const sortedByRating = [...state.filteredVideogames].sort((a, b) =>
        action.payload === 'asc' ? a.rating - b.rating : b.rating - a.rating
     );
     return { ...state, filteredVideogames: sortedByRating };  

        default:
            return state;
   }


}

export default rootReducer;