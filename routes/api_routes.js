const router = require('express').Router()
const { v4: generateID } = require('uuid')
const fs = require('fs/promises')
//const data = require('../db/users.json')

async function getData() {
    const data = await fs.readFile('./db/users.json', 'utf8')

    return JSON.parse(data)
}

//GET all users
router.get('/users', async (req, res) => {
    const data = await getData()
    const nameQuery = req.query.name?.toLowerCase()

    if (nameQuery) {
        const user = data.find(uObj => uObj.name.toLowerCase() === nameQuery)
        return res.json(user)
    }

    res.json(data)
})

//get user by id
router.get('/users/:user_id', async (req, res) => {
    const data = await getData()
    const id = req.params.user_id

    res.json(data.find((el) => {
        if (el.id == id || el.name == id) return true
    }) || { message: 'User not found' })

})

//JS post request
router.post('/users', async (req, res) => {
    const id = generateID()
    const data = await getData()
    if (!data.find((el) => el.name === req.body.name)) {
        data.push({
            ...req.body,
            id: id
        })

        await fs.writeFile('./db/users.json', JSON.stringify(data, null, 2))

        res.json({
            message: 'User added'
        })
    }
    else {
        res.json({
            message: 'User NOT added'
        })
    }
})

//JS Delete Req w/ json
// router.delete('/users', async (req, res) => {
//     const data = await getData()
//     const delID = req.body.id
//     const delEl = data.find((el) => el.id == delID)
//     if (delEl) {
//         const index = data.indexOf(delEl)
//         console.log(index)
//         data.splice(index, 1)
//         console.log(data)
//         await fs.writeFile('./db/users.json', JSON.stringify(data, null, 2))
//         res.json({
//             message: 'User deleted'
//         })
//     }
//     else {
//         res.json({
//             message: 'User NOT deleted'
//         })
//     }

// })

//using url
router.delete('/users/:id', async (req, res) => {
    const data = await getData()
    const delID = req.params.id
    const filtered = data.filter((uObj) => uObj.id != delID) //gives back new array
    if(data.length > filtered.length){
        await fs.writeFile('./db/users.json', JSON.stringify(filtered, null, 2))
        res.json({
            message: `User ${delID} deleted`
        })
        return
    }

    res.json({
        message: `User not found`
    })

})

module.exports = router
