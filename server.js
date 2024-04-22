const express = require('express')
const app = express()
const PORT = 3333

const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password:'Derp1Merp5!',
    database: 'student_course_db'
})

app.use(express.json())

app.get('/api/courses', async (req,res) => {
    const data = await client.query('SELECT * FROM courses')

    console.log(data)
})

app.post('/api/courses', async (req,res) => {
    const courseData = req.body
    await client.query(`INSERT INTO courses (name,type) VALUES ($1,$2)`, [courseData.name, courseData.type])

    response.json({
        message: 'Course added successfully'
    })
})

//Connect to database
client.connect()
.then(()=>{
    app.listen(PORT, () => {
        console.log('Server started on port', PORT)
    })
})
