const inquirer = require('inquirer')
const fs = require('fs')

function generateHTML(ans){
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>${ans.name}</h1>
    <p>Fav Color: ${ans.color}</p>
    <p>Address: ${ans.address}</p>
</body>
</html>
`
fs.writeFile('./index.html', html, (err) =>{
    if(err){
        return console.log(err)
    }   

    console.log('HTML file created')
})
}

    inquirer.prompt([
        {
            name:'color',
            message:'What is your favorite color?'
        },

        {
            name:'name',
            message: 'Please type your name'
        },
        {
            name:'address',
            message: "Please type your address"
        }
    ])
        .then((answerObj) => {
           generateHTML(answerObj)
        })
        .catch((err) => {
            console.log(err)
        })


