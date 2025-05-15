const express = require("express")
const holaRoutes = require("./routes/holaMundo.routes")

const app = express()
const port = (process.env.PORT || 3000)

app.set("port",port)
app.use("/api/hola",holaRoutes) //endpoint

app.get("/",(req,res)=> {
    res.send("Hola Mundo")
})

app.listen(port,() => {
    console.log(`Escuchando en el puerto ${port}`)
})

