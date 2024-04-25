const {Sequelize, DataTypes, Model} = require('sequelize')
const table = require('console.table')
const {hash, compare} = require('bcrypt')

const client = new Sequelize(
    'sequelize_practice_db', 
    'postgres', 
    'pass', {
    host: 'localhost',
    dialect:  'postgres' 
  });

  class Note extends Model {}

  Note.init(
    {  
        text:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: client
    }
)   

class User extends Model {
    async validatePass(formPassword){
        const is_valid = await compare(formPassword, this.password)

        return is_valid
    }
}

  User.init(
    {  
        email:{
            type: DataTypes.STRING,
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
        }
    },
    {
        sequelize: client,
        hooks: {
            async beforeCreate(user) {
                user.password = await hash(user.password, 10) //salt is how strong the aenryption is supposed to be

                //return user
            }
        }
    }
)

//one to many rel
User.hasMany(Note) 
Note.belongsTo(User) //userID on each note

client.sync({force: false}) //force true recreates tables
.then(async () =>{
    //create a user
    try{
        // await User.destroy({
        //     where: {},
        // })

        // await Note.destroy({
        //     where: {},
        // })
        // const note = await Note.findByPk(3, {
        //     include:User
        // })

        // const user = await User.findOne({
        //     where: {
        //         email: 'thomas@gmail.com'
        //     },
        //     include: Note
        // })

        // const note = await Note.create({
        //     text: 'Random Note',
        //     UserId: user.id
        // })

        const user = await User.findByPk(5)
        const formPassword = "password"

        const valid = await user.validatePass(formPassword)

        if(valid){
            console.log('Password correct. Logging in...')
        }else {
            console.log('Password incorrect')
        }

        // const note = await user.createNote({
        //     text: 'Note two for user'
        // })

        // const user = await User.create({
        //     email: 'thomas@gmail.com',
        //     password: 'password'
        // })

        // const user = await User.findByPk(1)
        // const note = await user.createNote({
        //     text: 'Note 1 for User'
        // })

        
    }catch (err){
        console.log(err)
    }
    
    //create new row in table
    // const note = await Note.create({
    //     text: 'Text for note one'
    // })

    //find all notes
    // const notes = await Note.findAll({
    //     attributes: ['text'],
    //     where: {
    //         id: 1
    //     }
    // })

    // const note = await Note.findOne({
    //     where: {
    //         id: 1
    //     }
    // })
    
    //find by primary key
    // const note = await Note.findByPk(1)
    // console.log(note)

    // const [amountOfUpdatedRows, allUpdatedNotes] = await Note.update(
    //     {
    //         text: 'Some even newer text for note 1'
    //     },
    //     {
    //         where:{
    //             id:1
    //         },
    //         returning: true
    //     }
    // )

    // const note = await Note.destroy(
    //     {
    //         where:{
    //             id:1
    //         },
    //         returning: true
    //     }
    // )
    // console.log(note)
})