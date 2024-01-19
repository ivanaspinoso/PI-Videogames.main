import { GET_VIDEOGAMES,SEARCH_BY_NAME,VIEW_VIDEOGAME_DETAIL,FILTER_BY_GENRE,FILTER_BY_NAME,SORT_BY_ALPHABET,SORT_BY_RATING } from "./actions-types";
import axios from "axios";

export function getVideogames(){
    return async function(dispatch) {
        const response = await axios.get('http://localhost:3001/videogames')
        dispatch({
            type: GET_VIDEOGAMES,
            payload: response.data
        })
    }
}

export function searchByName(name){
     return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        dispatch({
            type: SEARCH_BY_NAME,
            payload: response.data
        })
     }      
}

export function videogameDetail(id){
    return async function(dispatch){
        const response= await axios.get(`http://localhost:3001/videogames/${id}`)
        dispatch({
            type: VIEW_VIDEOGAME_DETAIL,
            payload: response.data
        })
    }
}

export function filterByGenre(genre){
    return {
        type: FILTER_BY_GENRE,
        payload: genre
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

