
function Person(name,age, hobbies){
    this.name = name
    this.age = age
    this.hobbies = hobbies
}

Person.prototype.haveBirthday = function (){
    this.age++
    console.log('Happy Birthday')
}

Person.prototype.printBirthday = function(){
    console.log(`You are ${this.age} years old`)
}

Person.prototype.species = 'homosapien'

const thomas =  new Person('thomas', 25, ['Coding', 'Gaming'])
thomas.haveBirthday()

thomas.printBirthday()