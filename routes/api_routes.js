const router = require('express').Router()
const { v4: generateID } = require('uuid');
const data = require('../db/data')

//GET all users
router.get('/users', (req,res) => {
    const nameQuery = req.query.name?.toLowerCase()

    if(nameQuery){
        const user = data.find(uObj => uObj.name.toLowerCase() === nameQuery)
        return res.json(user)
    }

    res.json(data)
})

//get user by id
router.get('/users/:user_id', (req,res) => {
    const id = req.params.user_id
    
    res.json(data.find((el) => {
        if(el.id == id || el.name == id)return true
    }) || {message: 'User not found'})

})

//make a POST route
router.post('/users/form', (req,res) => {
    console.log(req.body)

    res.redirect('/')
})
//JS post request
router.post('/users', (req,res) => {
    const id = generateID()

    data.push({
        ...req.body,
        id: id
    })

    res.json({
        message: 'User added'
    })
})

module.exports = router
