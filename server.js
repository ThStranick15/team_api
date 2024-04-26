const express = require('express')

const app = express()
const PORT = process.env.PORT || 3333

require('dotenv').config()
const client = require('./client')

const routes = require('./routes/api_routes')

//open json middlewear to be sent through request body
app.use(express.json())

app.use('/api', routes)

client.sync({force: false}) //force true recreates tables
.then(() =>{
    //start express server
    app.listen(PORT, () => {
        console.log('Server started on port', PORT)
    })
})