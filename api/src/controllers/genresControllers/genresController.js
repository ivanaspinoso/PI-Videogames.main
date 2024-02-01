require ("dotenv").config();
const axios=require("axios")
const {Genres}=require('../../db')

const {API_KEY,URL}=process.env

const getGenres = async (req,res)=>{
    try {
        
        const dbGenres = await Genres.findAll()

        if(dbGenres.length===0){
            
            const apiGenresRaw = (await axios.get(`${URL}/genres?key=${API_KEY}`)).data.results;
            
            const apiGenres= apiGenresRaw.map(apiGenre=>({
                name: apiGenre.name 
            }))
            
            //guardo los generos en la base de datos
            if(apiGenres.length>0){
            await Genres.bulkCreate(apiGenres)
            }
            //devuelvo los generos obtenidos en la API
            res.json(apiGenres)
        } else {

            res.json(dbGenres)
        }
    } catch (error) {
        console.error("Error al obtener los géneros:", error)
        res.status(500).json({message: "Error al obtener los generos"})
    }
}

module.exports={
    getGenres,
}
