    class Phone {
        screen = true
        constructor(number, size, model, color){
            this.number = number
            this.size = size
            this.model = model
            this.color = color
        }

        printModel(){
            console.log('Model:', 'Base')
        }
    }

    class iPhone extends Phone{
        facetime = true

        constructor(number, size, model, color, appleID){
            super(number, size, model, color)
            this.itunes = true
            this.appleID = appleID
        }

        printModel(){
            console.log('iPhone:', this.model)
        }
    }

    class Samsung extends Phone{
        foldable = true
    }

    const jdPhone = new iPhone('123-456-7890', 'standard', '15', 'slate grey', 'adasda')

    console.log(jdPhone)

// class Person{
//     species = 'homosapien'

//     constructor(name,age,hobbies){
//         this.name = name
//         this.age = age
//         this.hobbies = hobbies
//     }

//     haveBirthday(){
//         this.age++
//         console.log('Happy Birthday',this.name)
//     }

//     printBirthday(){
//         console.log(`You are ${this.age} years old`)
//     }

//     printHobbies(){
//         const arr = this.hobbies
//         arr.forEach(element => {
//             console.log(element)
//         });
//     }
// }

// const thomas =  new Person('thomas', 25, ['Coding', 'Gaming'])

// thomas.printHobbies()

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