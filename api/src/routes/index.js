const { Router } = require('express');
const router= Router()    

const videogamesRouter = require("../routes/videogamesRouter.js");
const genresRouter=require("../routes/genresRouter.js")

router.use("/videogames",videogamesRouter)
router.use("/genres",genresRouter )

module.exports = router;
