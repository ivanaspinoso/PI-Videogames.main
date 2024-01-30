const axios=require("axios");
require("dotenv").config();
const {API_KEY, URL}=process.env
const {Videogame}=require("../../db")
const {Op}=require("sequelize")

  // esta funcion encapsula la logica para crear un nuevo videojuego en la base de datos(con sequelize), utilizo desetructuracion y bloque try-catch para manejar posibles errores
const createVideogame = async (req,res)=>{
    console.log(req.body);
    try {
        
        const { name, description, platforms, image, released, rating, genres } = req.body;
        console.log(genres,'genres')
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
    console.log(newVideogame, "newvideogame")
     res.status(201).json({
        message:"Videojuego creado exitosamenteeeeeee",
        videogame: newVideogame,
    }) //respuestas de creación exitosa
    } catch (error) {
        console.error("Error al crear un nuevo videojuego",error)
        res.status(500).json({message: "Error al crear un nuevo videojuego"});
    }
}

//controlador para obtener videojuego por ID
const getVideogamebyID = async (req, res) => {
    const {id} = req.params 

    //verifica si el ID tiene un guion
    if(id.includes('-')){
        //busca el videojuego en la base de datos con el ID
        let videogameDb = await Videogame.findOne({
            where:{
                id:id,
            },
            include: Genres //incluye la asociacion con el modelo Genre
        })

        // contiene el objeto a cadena JSON y luego lo vuelve a parsear para asegurar que los datos sean objetos
        videogameDb=JSON.stringify(videogameDb)
        videogameDb= JSON.parse(videogameDb)

        //mapea los nombres de los generos para que sea mas legible
        videogameDb.genres = videogameDb.genres.map(g=>g.name)

        //retorna la informacion del videojuego desde la base de datos
        res.json(videogameDb)
    }

    //si el iD no contiene "-", realiza la solicitud a la API externa
    try {
        //realiza una solicitud a la API externa para obtener la info
        const response = await axios.get(`${URL}/games/${id}?key=${API_KEY}`)

        //extrae los datos relevante de la respuesta de la API
        let {name, background_image, genres, description, released: releaseDate, rating, platforms}= response.data

        //mapea los nombres de los generos para que sea mas legible
        genres = genres.map(g=>g.name)
        //mapea los nombres de las plataformas
        platforms=platforms.map(p=>p.platform.name)
        //retorna la informacion del videojuego desde la API externa
        return res.json({
            name,
            background_image,
            genres,
            description,
            releaseDate,
            rating,
            platforms
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Error al obtener el videojuego por ID: ${err.message}` });
    }
};
//este controlador busca info del videojuego segun el id proporcionado, primero en la base de datos local y, si no se encuentra, realiza una solicitud a la API externa.
 
   

//cleanArray => toma un array de objetos de videojuegos y devuelve un nuevo array donde las plataformas se combinan y se obtienen los nombres únicos, y los ID de géneros se extraen para cada objeto.
//es una funcion para limpiar y transformar un array de objetos de juegos
// const cleanArray = (array) => { 
//     return array?.map(elem=>{
//         //para cada elemento(elem) del array, realiza las siguientes operaciones:

//         //combina las plataformas y las plataformas parentales del elem,luego aplana el array y extrae los nombres unicos 
//         const platforms=[elem.platforms, elem.parent_platforms]
//         .flatMap(platform=>platform.map(p=>p.platform.name) // flatmap=>aplasta el array de arrays resultantes map=> extrae los nombres de las plataformas
//         .filter((name,index,array)=>array.indexOf(name)=== index)) // obtiene nombres unicos eliminando duplicados (Con indexOf)

//         //se crea una array extrayendo los ID de los generos del elemento actual
//         const genres = elem.genres.map(g => g.id)

//         //retorna un nuevo objeto con las propiedades transformadas
//         return {
//             id: elem.id,
//             name: elem.name,
//             description: elem.description,
//             platforms: platforms,
//             background_image: elem.background_image,
//             released: elem.released,
//             rating: elem.rating,
//             genres: genres,
//         }
//     })
    
//   };

// controlador para obtener todos los videojuegos
const getAllGames= async(req,res)=>{
    try {
        //obtengo todos los videojuegos de la base de datos
        const dbVideogames = await Videogame.findAll();
        //obtengo los videojuegos de la API y los procesa utilizando la funcion cleanArray
        const apiVideogamesURL= (await axios.get(`${URL}/games?key=${API_KEY}`)).data.results;
        const apiVideogames= apiVideogamesURL

        //combino los resultados de la base de datos y de la API
        const result = [...dbVideogames, ...apiVideogames];

        //devuelvo el resultado como respuesta JSON
        res.json(result) ;
} catch (error) {
    console.error("Error al obtener todos los videojuegos", error);
    res.status(500).json({ message: `Error al obtener todos los videojuegos: ${error.message}` });
}

}

const getVideogamesByName= async(req,res)=>{
    console.log('entro')

        const {name}=req.query; // se utiliza la desestructuracion para extraer el parametro "name" de la consulta(query) de la solicitud(req)
        try{
        //busco videojuegos en la base de datos que coincidan con el nombre
        const databaseVideogames= await Videogame.findAll({
            where: {
            name:{
                [Op.iLike]: `%${name}%` //busca case insensitive(sin distinguir mayuscula de minusculas)
            }
        },
        limit: 15 //se limita el resultado a 15 videojuegos
        });
       
        //obtengo videojuegos en la API que coincidan con el nombre usando axios y los procesa
        const apiVideogamesRaw= await axios.get(`${URL}/games?search=${name}&key=${API_KEY}&pageSize=15`);
        // const apiVideoGame= cleanArray(apiVideogamesRaw) //se aplica la funcion cleanArray 
        const data = apiVideogamesRaw?.data?.results
        //filtra los videojuegos de la API que coincidan con el nombre
        const filteredApi=data?.filter((game)=>game.name.toLowerCase().includes(name.toLowerCase()))
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
