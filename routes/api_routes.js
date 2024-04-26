const router = require('express').Router()

//import team and player models
const { Team, Player } = require('../models')

//handles errors
function handleValidationError(err, res) {
    console.log(err)

    const errors = err.errors.map(eObj => {
        return {
            message: eObj.message
        }
    })

    res.status(400).json({
        message: 'Validation Error',
        errors: errors
    })
}

//GET route to get all teams and associated players

router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.findAll({
            include: {
                model: Player,
                //remove pass col from all assoc players
                attributes: {
                    exclude: ['password']
                }
            }
        })
        res.json(teams)
    } catch (err) {
        handleValidationError(err, res)
    }
})

//GET route for all players amd associated teams

router.get('/players', async (req, res) => {
    try {
        const players = await Player.findAll({
            include: Team
        })
        res.json(players)
    } catch (err) {
        handleValidationError(err, res)
    }
})

//GET single player by ID and attatch associated teams

router.get('/players/:id', async (req, res) => {
    try {
        const id = req.params.id
        const player = await Player.findByPk(id, {
            module: Team
        })
        res.json(player)
    } catch (err) {
        handleValidationError(err, res)
    }
})

//GET single team by ID and attatch associated teams

router.get('/teams/:id', async (req, res) => {
    try {
        const id = req.params.id
        const team = await Team.findByPk(id, {
            module: Player,
            attributes: {
                exclude: ['password']
            }
        })
        res.json(team)
    } catch (err) {
        handleValidationError(err, res)
    }
})

//create a POST route to create a team

router.post('/teams', async (req, res) => {
    try {
        const team = req.body
        const newTeam = await Team.create(team)
        res.json(newTeam)
    } catch (err) {

        handleValidationError(err, res)
    }
})

//create a post route to create a player

router.post('/players', async (req, res) => {
    try {
        const player = req.body
        const newPlayer = await Player.create(player)
        res.json(newPlayer)
    } catch (err) {
        handleValidationError(err, res)
    }
})

//create put route to edit a player
router.put('/players/:id', async (req, res) => {
    try {
        const id = req.params.id
        const player = req.body
        const editPlayer = await Player.update(player, {
            where: {
                player_id: id
            }
        })
        res.json(editPlayer)
    } catch (err) {
        handleValidationError(err, res)
    }
})

//create put to edit team info
router.put('/teams/:id', async (req, res) => {
    try {
        const id = req.params.id
        const team = req.body
        const editTeam = await Team.update(team, {
            where: {
                team_id: id
            }
        })
        res.json(editTeam)
    } catch (err) {
        handleValidationError(err, res)
    }
})

//create DELETE to delete player
router.delete('/players/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Player.destroy({
            where: {
                player_id: id
            }
        })
        res.json({
            message: 'Player deleted successfuly'
        })
    } catch (err) {
        handleValidationError(err, res)
    }
})

//create DELETE to delete team
router.delete('/teams/:id', async (req, res) => {
    try {
        const id = req.params.id
        const editTeam = await Team.destroy({
            where: {
                team_id: id
            }
        })
        res.json(editTeam)
    } catch (err) {
        handleValidationError(err, res)
    }
})

//create a post route to conect player to a team
router.post('/add', async (req, res) => {
    try {
        const team = await Team.findByPk(req.body.team_id)
        const player = await Player.findByPk(req.body.player_id)

        const addition = await team.addPlayer(player)

        res.json(addition)
    } catch (err) {
        handleValidationError(err, res)
    }
})


module.exports = router