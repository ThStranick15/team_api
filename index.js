const express = require('express')

const app = express()
const PORT = 3333

const data = [
    {
        id: 1,
        name: 'Thomas',
        age: 25
    },
    {
        id: 2,
        name: 'Kerry',
        age: 25
    },
    {
        id: 3,
        name: 'Tiffany',
        age: 24
    }
]

//Create GET route that listens for the user to visit the root address/domain
//When visit root address trigger
app.get('/', (req,res) => {
    res.send('Hello World')
})

app.get('/api/:user_id', (req,res) =>{
    const id = req.params.user_id

    const user = data.find((userObj) => {
        if(userObj.id == id) return true
    })

    if(user){
        return res.json(user)
    }
    return res.json({
        message: 'User not found matching id'
    })
})

app.get('/about', (req,res) =>{
    res.send('<h1>About Me</h1>')
})

app.get('/data', (req,res) =>{
    const queryParams = req.query

    //Create empty obj
    const obj = {}
    //If request name (name=true) then add property name to obj
    if(queryParams.name === 'true'){
        obj.name = 'Thomas'
    }
    //If request age (age=true) then add age property to obj
    if(queryParams.age === 'true'){
        obj.age = '25'
    }
    //send the completed obj back in response
    console.log(queryParams)

    res.json(obj)
})

//Start the server - tell the server to start listening for routes to be visited
app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})