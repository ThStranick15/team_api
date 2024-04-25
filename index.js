const {Sequelize, DataTypes, Model} = require('sequelize')
const table = require('console.table')
const {hash, compare} = require('bcrypt')

const client = new Sequelize(
    'teams_db', 
    'postgres', 
    'pass', {
    host: 'localhost',
    dialect:  'postgres' 
  });

  class Team extends Model {}

  Team.init(
    {  
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        coach:{
            type: DataTypes.STRING
        }
    },
    {
        sequelize: client,
        modelName: 'team',
        timestamps: false
    }
)   

class Player extends Model {
    async validatePass(formPassword){
        const is_valid = await compare(formPassword, this.password)

        return is_valid
    }
}

    Player.init(
    {  
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            validate: {
                len: 6
            },
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        age: {
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize: client,
        modelName: 'player',
        hooks: {
            async beforeCreate(user) {
                user.password = await hash(user.password, 10) //salt is how strong the aenryption is supposed to be
            }
        },
        timestamps: false
    }
)

Team.belongsToMany(Player, {
    through: 'team_player'
})

Player.belongsToMany(Team, {
    through: 'team_player'
})


client.sync({force: false}) //force true recreates tables
.then(async () =>{
    // const braves = await Team.create({
    //     name: 'Braves',
    //     type: 'baseball',
    //     coach: 'Brian Snitker'
    // })

    // console.log(braves)

    // const julie = await Player.create({
    //     email: 'julie@test.com',
    //     password: 'password',
    //     first_name: 'Julie',
    //     last_name: 'Wilson',
    //     age: 15
    // })

    // const braves = await Team.findByPk(1, {
    //     include: Player
    // })

    // console.log(braves.get({plain: true}))

    const julie = await Player.findByPk(2, {
        include: Team
    })
    console.log(julie.get({plain: true}))

    // braves.addPlayer(julie)

    // console.log('Player has been added')
})