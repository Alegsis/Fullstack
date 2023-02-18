const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }
    const style = {
        color: notification.type === 'alert' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 25,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5
    }

    return (
        <div style={style}>
            {notification.message}
        </div>
    )
}

export default Notification