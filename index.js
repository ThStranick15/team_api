const fs = require('fs')
const studentName = process.argv[2]

if(studentName === 'print'){
    fs.readFile('students.txt', 'utf8', (err, data) =>{
        if(err){
            //throw err //if error throw to console and stop program
            return console.log(err)
        }
    
        console.log('Student List:', '\n', '----------')
        const names = data.split('\n')
    
        for(let name of names){
            console.log(name)
        }
    })
}else{
    fs.appendFile('students.txt', '\n' + studentName, (err) =>{ //will overwrite a files contents
        if(err){
            //throw err //if error throw to console and stop program
            return console.log(err)
        }
        console.log('Student Added')
    })
}



// fs.readFile('students.txt', 'utf8', (err, data) =>{
//     if(err){
//         //throw err //if error throw to console and stop program
//         return console.log(err)
//     }

//     console.log('Student List:', '\n', '----------')
//     const names = data.split('\n')

//     for(let name of names){
//         console.log(name)
//     }
// })

