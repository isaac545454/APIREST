
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const personRouter = require('./router/personRouter')
const url = process.env.url_db
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/person', personRouter)     

app.get('/', (req, res)=>{
    res.json({message: "oi express"})
})
mongoose.connect(url)
.then( ()=>{
     console.log("conectado com o banco de dados");
     app.listen(3000)
})
.catch((err)=>{console.log(err)})