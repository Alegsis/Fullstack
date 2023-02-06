/*
const mongoose = require('mongoose')
GenereteId = () => Math.floor(Math.random() * 10000)
const password = process.argv[2]
const url = "mongodb+srv://fullstack:(password)@cluster0.ysemxxl.mongodb.net/Person?retryWrites=true&w=majority"

mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: String
})
const Person = mongoose.model('Person', personSchema)
const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: GenereteId()
})
if (process.argv.length === 5) {
    person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
        process.exit(1)
    })
}
if (process.argv.length === 3) {
    Person.find({}).then(result =>{
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}
*/
