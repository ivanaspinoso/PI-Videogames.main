const {Router}=require("express")
const db = require("../db");
const {createVideogame,
    getVideogamebyID,
    getAllGames,
    getVideogamesByName,} = require("../controllers/videogameController/videogameController.js")

const videoGameRouter = Router()

videoGameRouter.get("/", getAllGames)

videoGameRouter.get("/:id", getVideogamebyID)

videoGameRouter.get("/search", getVideogamesByName)

videoGameRouter.post("/",createVideogame)

module.exports=videoGameRouter;