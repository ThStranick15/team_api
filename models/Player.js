const {Sequelize, DataTypes, Model} = require('sequelize')
const client = require('../client')
const { hash, compare } = require('bcrypt')

class Player extends Model {
    async validatePass(formPassword){
        const is_valid = await compare(formPassword, this.password)

        return is_valid
    }

    toJSON(){ //when converting to JSON it removes the password field
        const player = Object.assign({},this.get())

        delete player.password
        return player
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
            unique: {
                args: true,
                msg: 'That email is already in use'
            },
            validate: {
                notNull:{
                    args: false,
                    msg: 'you must provide a valid email address'
                },
                isEmail: {
                    args: true,
                    msg: 'you must provide a valid email string'
                }
            },
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: 6,
                    msg: 'Your password must be at least 6 chars in length'
                }
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

module.exports = Player