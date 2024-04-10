
class Person{
    constructor(name,age,hobbies){
        this.name = name
        this.age = age
        this.hobbies = hobbies
    }

    haveBirthday(){
        this.age++
        console.log('Happy Birthday',this.name)
    }

    printBirthday(){
        console.log(`You are ${this.age} years old`)
    }

    printHobbies(){
        const arr = this.hobbies
        arr.forEach(element => {
            console.log(element)
        });
    }
}

const thomas =  new Person('thomas', 25, ['Coding', 'Gaming'])

thomas.printHobbies()

// function Person(name,age, hobbies){
//     this.name = name
//     this.age = age
//     this.hobbies = hobbies
// }



// Person.prototype.haveBirthday = function (){
//     this.age++
//     console.log('Happy Birthday')
// }

// Person.prototype.printBirthday = function(){
//     console.log(`You are ${this.age} years old`)
// }

// Person.prototype.species = 'homosapien'


// thomas.haveBirthday()

// thomas.printBirthday()