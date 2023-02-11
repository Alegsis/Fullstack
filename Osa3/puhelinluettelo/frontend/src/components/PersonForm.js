const PersonForm = ({ newName, newNumber, nameChange, numberChange, addContact }) => {
    return (
        <form onSubmit={addContact}>
            <div>
                name:
                <input value={newName} onChange={nameChange} />
            </div>
            <div>
                number:
                <input value={newNumber} onChange={numberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm