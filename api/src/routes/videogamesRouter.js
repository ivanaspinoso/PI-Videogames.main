const {Router}=require("express")
const db = require("../db");
const {createVideogame,
    getVideogamebyID,
    getAllGames,
    getVideogamesByName,} = require("../controllers/videogameController/videogameController.js")

const videoGameRouter = Router()

videoGameRouter.get("/search", getVideogamesByName)

videoGameRouter.get("/:id", getVideogamebyID)

videoGameRouter.get("/", getAllGames)

videoGameRouter.post("/",createVideogame)

module.exports=videoGameRouter;