const express = require('express')
const path = require('path')

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
//Create GET route for every file in public
app.use(express.static('./public'))

//Create GET route that listens for the user to visit the root address/domain
//When visit root address trigger
// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname,'./public/index.html'))
// })

//GET API route to send back the array of users
app.get('/users', (req,res) => {
    const nameQuery = req.query.name.toLowerCase()

    if(nameQuery){
        const user = data.find(uObj => uObj.name.toLowerCase() === nameQuery)
        return res.json(user)
    }

    res.json(data)
})
//get api route to capture an id of a user and sedn back the matching user obj from the data array
app.get('/users/:user_id', (req,res) => {
    const id = req.params.user_id
    
    res.json(data.find((el) => {
        if(el.id == id || el.name == id)return true
    }) || {message: 'User not found'})

})

//BONUS if user sends name query param find user by name instead and send back match

//Start the server - tell the server to start listening for routes to be visited
app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})