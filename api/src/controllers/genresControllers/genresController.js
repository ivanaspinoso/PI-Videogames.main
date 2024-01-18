require ("dotenv").config();
const axios=require("axios")
const {Genre} =require("../../db")
const {API_KEY,URL}=process.env

const getGenres = async (req,res)=>{
    try {
        
        const dbGenres = await Genre.findAll()

        if(dbGenres.length===0){
            //obtengo los generos de la API
            const apiGenresRaw = await axios.get(`${URL}/genres?key?=${API_KEY}`).data.results;
            const apiGenres= apiGenresRaw.map(apiGenre=>({
                name: apiGenre.name //Se utiliza map para transformar cada objeto de género obtenido de la API en un nuevo objeto con las propiedad name. Esto crea un array apiGenres con objetos más simples que representan los géneros.
            }))

            /*
            este bloque de código verifica si la base de datos de géneros está vacía. 
            Si es así, hace una solicitud a la API para obtener los géneros y los transforma en un formato más simple antes
            de almacenarlos en la variable apiGenres.
            Este array apiGenres contendrá la información de los géneros obtenidos de la API,
            y se utilizará para almacenarlos en la base de datos en la siguiente parte del código.
            */
            
            //guardo los generos en la base de datos
            await Genre.bulkCreate(apiGenres)

            //devuelvo los generos obtenidos en la API
            res.json(apiGenres)
        } else {

            res.json(dbGenres)
        }
    } catch (error) {
        console.error("Error al obtener los géneros")
        res.status(500).json({message: "Error al obtener los generos"})
    }
}

module.exports={
    getGenres,
}
