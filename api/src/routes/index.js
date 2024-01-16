const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const db= require("../db")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req,res)=>{

})

router.get("/:idVideogame", async(req,res)=>{

})

router.get("/name", async(req,res)=>{

})

router.post("/", async(req,res)=>{
    
})

module.exports = router;
