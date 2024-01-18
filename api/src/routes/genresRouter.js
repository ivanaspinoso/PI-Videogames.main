const {Router}= require("express")
const db=require("../db")
//importar controlador
const genresRouter= Router()
const {getGenres} =require("../controllers/genresControllers/genresController.js")

genresRouter.get("/", getGenres)

module.exports= genresRouter;