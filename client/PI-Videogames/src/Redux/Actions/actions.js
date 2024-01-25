import axios from 'axios';
import { GET_VIDEOGAMES,SEARCH_BY_NAME,VIEW_VIDEOGAME_DETAIL,FILTER_BY_GENRE,FILTER_BY_NAME,SORT_BY_ALPHABET,SORT_BY_RATING } from "./actions-types";

const apiUrl='http://localhost:3001'

export function getVideogames(){
    return async function(dispatch) {
        try{
        const response = await axios.get(`${apiUrl}/videogames`)
        dispatch({
            type: GET_VIDEOGAMES,
            payload: response.data
        })
    }catch(error){
        console.error('Error en la acción de obtener videojuegos:', error)
    }
}
}

export function searchByName(input) {

    return async function (dispatch) {
       try {
          const response = await axios.get(`${apiUrl}/videogames?name=${input}`);
          console.log(response.data, 'response')
          dispatch({ type: SEARCH_BY_NAME, payload: response.data });
       } catch (error) {
          console.error('Error en la acción de búsqueda:', error);
       }
    }
 }
 

export function videogameDetail(id){
    return async function(dispatch){
        try{
        const response= await axios.get(`${apiUrl}/videogames/${id}`)
        dispatch({
            type: VIEW_VIDEOGAME_DETAIL,
            payload: response.data
        })
    }catch(error){
        console.error('Error en la acción de obtener detalle del videojuego:', error)
    }
}}

export function filterByGenre(genres){
    return {
        type: FILTER_BY_GENRE,
        payload: genres
    }
}

export function filterByName(input){
    return{
        type: FILTER_BY_NAME,
        payload: input
    }
}

export function sortByAlphabet(payload){
    return{
        type:SORT_BY_ALPHABET,
        payload: payload
    }
}

export function sortByRating(payload){
    return{
        type:SORT_BY_RATING,
        payload: payload
    }
}

