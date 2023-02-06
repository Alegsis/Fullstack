const Notification = ({ message, boolean }) => {
    if (message === null) {
        return null
    }

    if (boolean)
        return (
            <div className="error">
                {message}
            </div>
        )

    if (!boolean)
        return (
            <div className="addedMessage">
                {message}
            </div>
        )
}

export default Notification