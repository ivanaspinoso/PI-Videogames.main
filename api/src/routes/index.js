const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const db= require("../db")
const router= Router()    

const videogamesRouter = require("../routes/videogamesRouter.js");
const genresRouter=require("../routes/genresRouter.js")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames",videogamesRouter)
router.use("/genres",genresRouter )

module.exports = router;
