const axios=require("axios");
require("dotenv").config();
const {API_KEY,URL}=process.env
const {Videogame}=require("../../db")
const {Op}=require("sequelize")

  // esta funcion encapsula la logica para crear un nuevo videojuego en la base de datos(con sequelize), utilizo desetructuracion y bloque try-catch para manejar posibles errores
const createVideogame = async (req,res)=>{
    try {
        
        const { name, description, platforms, image, released, rating, genres } = req.body;
        //creo el videojuego en la base de dato
        const newVideogame= await Videogame.create({ //se utiliza el metodo create para insertar un nuevo registro en la tabla "Videogame"
            name,
            description,
            platforms,
            image,
            released,
            rating,
            genres,
        })

     res.status(201).json({
        message:"Videojuego creado exitosamente",
        videogame: newVideogame,
    }) //respuestas de creación exitosa
    } catch (error) {
        console.error("Error al crear un nuevo videojuego",error)
        res.status(500).json({message: "Error al crear un nuevo videojuego"});
    }
}

//controlador para obtener videojuego por ID
const getVideogamebyID= async(req,res)=>{

    const {id}=req.params;
    const source = isNaN(id) ? "db" : "api"
    try {

        // obtengo la respuesta segun la fuente (API o base de datos)
        const response = source === "api" 
        ? await axios.get(`${URL}/games/${id}?key=${API_KEY}`)
        : await Videogame.findByPk(id)

        if(!response){
        // Si el resultado es nulo (no se encontró el juego en la base de datos)
        return null;
        }

        if(source==="api"){
            const {id: apiId, name, description, released, platforms, image, rating , genres} = response.data
            const platformName = platforms.map(data => data.platform.name)
            const genreName = genres.map(data=>data.name)

            return {
                id: apiId, name, description, released, platformName, image, rating, genreName
            } 
          }else {
            // si la fuente es la base de datos, retorna la respuesta directamente
                return response
            }
        
    } catch (error) {
        console.error("Error al obtener el videojuego por ID", error)
        throw new Error("Error al obtener el videojuego por ID: " + error.message)
    }
}

//toma un array de elementos, realiza transformaciones especificas en las propiedades de cada elemento
// y retorna un nuevo array con los elementos transformados => sirve para normalizar  la estructura de datos obtenida de una API u otra fuente de datos
//es una funcion para limpiar y transformar un array de objetos de juegos
const cleanArray = (array) => { 
    return array.map(elem=>{
        //para cada elemento(elem) del array, realiza las siguientes operaciones:

        //combina las plataformas y las plataformas parentales del elem,luego aplana el array y extrae los nombres unicos 
        const platforms=[elem.platforms, elem.parent_platforms]
        .flatMap(platform=>platform.map(p=>p.platform.name) // flatmap=>aplasta el array de arrays resultantes map=> extrae los nombres de las plataformas
        .filter((name,index,array)=>array.indexOf(name)=== index)) // obtiene nombres unicos eliminando duplicados (Con indexOf)

        //se crea una array extrayendo los ID de los generos del elemento actual
        const genres = elem.genres.map(g => g.id)

        //retorna un nuevo objeto con las propiedades transformadas
        return {
            id: elem.id,
            name: elem.name,
            description: elem.description,
            platforms: platforms,
            image: elem.image,
            released: elem.released,
            rating: elem.rating,
            genres: genres,
        }
    })
    
  };

// controlador para obtener todos los videojuegos
const getAllGames= async(req,res)=>{
    try {
        //obtengo todos los videojuegos de la base de datos
        const dbVideogames = await Videogame.findAll();
        
        //obtengo los videojuegos de la API y los procesa utilizando la funcion cleanArray
        const apiVideogamesURL= (await axios.get(`${URL}/games?key=${API_KEY}`)).data.results;
        const apiVideogames= cleanArray(apiVideogamesURL)

        //combino los resultados de la base de datos y de la API
        const result = [...dbVideogames, ...apiVideogames];

        //devuelvo el resultado como respuesta JSON
        res.json(result) ;
    } catch (error) {
        console.error('Error al obtener todos los videojuegos', error);
        res.status(500).json({message: "Error al obtener los videojuegos"})
    }
}

const getVideogamesByName= async(req,res)=>{

        const {name}=req.query; // se utiliza la desestructuracion para extraer el parametro "name" de la consulta(query) de la solicitud(req)
try{
        //busco videojuegos en la base de datos que coincidan con el nombre
        const databaseVideogames= await Videogame.findAll({
            where: {
            nombre:{
                [Op.iLike]: `%${name}%` //busca case insensitive(sin distinguir mayuscula de minusculas)
            }
        },
        limit: 15 //se limita el resultado a 15 videojuegos
        });
       
        //obtengo videojuegos en la API que coincidan con el nombre usando axios y los procesa
        const apiVideogamesRaw= await axios.get(`${URL}/games?search=${name}&key=${API_KEY}&pageSize=15`).data.results;
        const apiVideoGame= cleanArray(apiVideogamesRaw) //se aplica la funcion cleanArray 

        //filtra los videojuegos de la API que coincidan con el nombre
        const filteredApi=apiVideoGame.filter((game)=>game.name.toLowerCase().includes(name.toLowerCase()))

        //combino los videojuegos de la base de datos y de la API
        const result = [...databaseVideogames, ...filteredApi]; //Se combinan los videojuegos obtenidos de la base de datos con los de la API.

       //se verifica si hay resultados combinados en los pirmeros 15
       if(result.length===0){
        return { message: `No se encontró ningun videojuego que coincida con: '${name}' `}
       }
          //si hay resultados, retorna un  arreglo que contiene los videojuegos, hasta 15
          res.json(result.slice(0,15))
} catch(error){
    console.error('Error al obtener videojuegos por nombre', error);

    res.status(500).json({ message: 'Error al obtener videojuegos por nombre' });

}
};

module.exports ={
    createVideogame,
    getVideogamebyID,
    getAllGames,
    getVideogamesByName,
} 
