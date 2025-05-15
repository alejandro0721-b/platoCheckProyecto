const express = require("express")
const router = express.Router()
const holaController = require("../controllers/holaMundo.controllers")

router.get("/",(req,res) => {
    res.send("estamos en la ruta hola")
})

router.get("/",holaController.holaMundo)


module.exports = router