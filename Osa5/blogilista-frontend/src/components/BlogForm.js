import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const TitleChange = (event) => {
        setTitle(event.target.value)
    }

    const AuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const UrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                Title:
                <input
                    id = 'title'
                    value={title}
                    onChange={TitleChange}
                    placeholder='Title'
                />
            </div>
            <div>
                Author:
                <input
                    id = 'author'
                    value={author}
                    onChange={AuthorChange}
                    placeholder='Author'
                />
            </div>
            <div>
                Url:
                <input
                    id = 'url'
                    value={url}
                    onChange={UrlChange}
                    placeholder='Url'
                />
            </div>
            <button id = "create-button" type="submit">Create</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm