
const Persons = ({ contactsToShow, removeContact }) => {
    return (
        contactsToShow.map(person =>
            <div key={person.name}>
                {person.name} {person.number}
                <button value={person.id} onClick={() => removeContact(person.id)}>
                    delete
                </button>
            </div>

        )
    )
}

export default Persons