const Persons = ({ contactsShow, contactsRemove }) => {
    return (
        contactsShow.map(person =>
            <div key={person.name}>
                {person.name} {person.number}
                <button value={person.id} onClick={() => contactsRemove(person.id)}>
                    delete
                </button>
            </div>

        )
    )
}

export default Persons