const axios=require("axios");
require("dotenv").config();
const {API_KEY, URL}=process.env
const {Videogame}=require("../../db")
const {Op}=require("sequelize")

const createVideogame = async (req,res)=>{
    try {
        
        const { name, description, platforms, image, released, rating, genres } = req.body;
        const newVideogame= await Videogame.create({ 
            name,
            description,
            platforms,
            image,
            released,
            rating,
            genres,
        })
        const databasecreateVideogames= await Genres.findAll({
            where: {
                name:name        
        },
       
        });


     res.status(201).json({
        message:"Videojuego creado exitosamente",
        videogame: newVideogame,
    }) 
    } catch (error) {
        console.error("Error al crear un nuevo videojuego",error)
        res.status(500).json({message: "Error al crear un nuevo videojuego"});
    }
}

const getVideogamebyID = async (req, res) => {
    const {id} = req.params 

    if(id.includes('-')){
        let videogameDb = await Videogame.findOne({
            where:{
                id:id,
            },
            include: Genres 
        })

        videogameDb=JSON.stringify(videogameDb)
        videogameDb= JSON.parse(videogameDb)

        videogameDb.genres = videogameDb.genres.map(g=>g.name)

        res.json(videogameDb)
    }

    try {
        const response = await axios.get(`${URL}/games/${id}?key=${API_KEY}`)

        let {name, background_image, genres, description, released: releaseDate, rating, platforms}= response.data

        genres = genres.map(g=>g.name)
        platforms=platforms.map(p=>p.platform.name)
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
 
   

const getAllGames= async(req,res)=>{
    try {
        const dbVideogames = await Videogame.findAll();
        const apiVideogamesURL= (await axios.get(`${URL}/games?key=${API_KEY}`)).data.results;
        const apiVideogames= apiVideogamesURL

        const result = [...dbVideogames, ...apiVideogames];

        res.json(result) ;
} catch (error) {
    console.error("Error al obtener todos los videojuegos", error);
    res.status(500).json({ message: `Error al obtener todos los videojuegos: ${error.message}` });
}

}

const getVideogamesByName= async(req,res)=>{
    console.log('entro')

        const {name}=req.query; 
        try{
        const databaseVideogames= await Videogame.findAll({
            where: {
            name:{
                [Op.iLike]: `%${name}%` 
            }
        },
        limit: 15 
        });
       
        
        const apiVideogamesRaw= await axios.get(`${URL}/games?search=${name}&key=${API_KEY}&pageSize=15`);
        const data = apiVideogamesRaw?.data?.results
        const filteredApi=data?.filter((game)=>game.name.toLowerCase().includes(name.toLowerCase()))
        const result = [...databaseVideogames, ...filteredApi]; 

       if(result.length===0){
        return { message: `No se encontró ningun videojuego que coincida con: '${name}' `}
       }
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
