const args = process.argv

//console.log('browser stuff', document, window)

console.log(args)

//Get two number args from the users command (process.argv)
const num1 = args[2]
const num2 = args[3]
//Add those together
const sum = +num1 + +num2
//Console log sum
console.log(sum)