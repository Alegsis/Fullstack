import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contacts from './services/contacts'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(true)

    useEffect(() => {
        contacts.getAll()
            .then(initialContacts =>
                setPersons(initialContacts))
    }, [])


    const addContact = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

                const updateNumber = {
                    name: newName,
                    number: newNumber
                }
                const id = persons.find(person => person.name === newName).id
                contacts.update(id, updateNumber)
                    .then(returnedContact => {
                        const number = returnedContact.number
                        setPersons(persons.map(person => {
                            if (person.id === id) {
                                return { ...person, number }
                            }
                            else {
                                return person
                            }
                        }))
                        setNewName('')
                        setNewNumber('')
                    })
                    .getAll()
                    .then(initialContacts =>
                        setPersons(initialContacts))
                    .catch(error => {
                        setError(true)
                        setMessage(`Information of ${newName} has already been removed from the server`)
                    })
            }
        }
        else {
            const contactObject = {
                name: newName,
                number: newNumber
            }
            contacts.add(contactObject)
                .then(returnedContact => {
                    setPersons(persons.concat(returnedContact))
                })
                .then(added => {
                    setError(false)
                    setMessage(`Added ${newName}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 2500)
                    setNewName('')
                    setNewNumber('')
                })
                .catch(err => {
                    setError(true)
                    setMessage(err.response.data.error)
                })
        }
    }
    const contactsRemove = (id) => {
        if (window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)) {
            contacts.remove(id)
                .then(returnedContact => {
                    setPersons(persons.filter((person => person.id !== id)))
                })
        }
    }
    const nameChange = (event) => setNewName(event.target.value)
    const numberChange = (event) => setNewNumber(event.target.value)
    const filterChange = (event) => setFilter(event.target.value)

    const contactsShow = filter === ''
        ? persons
        : persons.filter(person => person.name.includes(filter))



    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} boolean={error} />
            <Filter value={filter} onChange={filterChange} />
            <h2>Add new contact</h2>
            <PersonForm newName={newName} newNumber={newNumber}
                        nameChange={nameChange} numberChange={numberChange}
                        addContact={addContact} />
            <h2>Numbers</h2>
            <Persons contactsShow={contactsShow} contactsRemove={contactsRemove} />
        </div>
    )

}

export default App
