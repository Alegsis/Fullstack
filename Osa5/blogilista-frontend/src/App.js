import { useState, useEffect, useRef } from 'react'
import blogsServices from './services/blogs'
import loginServices from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogsServices.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedBlogUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedBlogUserJSON) {
            const user = JSON.parse(loggedBlogUserJSON)
            setUser(user)
            blogsServices.setToken(user.token)
        }
    }, [])

    const sendNotification = (message, type = 'info') => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        try {
            const user = await loginServices.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBloguser', JSON.stringify(user)
            )
            blogsServices.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }
        catch {
            sendNotification('Given username or password are wrong', 'alert')
        }
    }

    const logout = (event) => {
        event.preventDefault()
        window.localStorage.clear()
    }

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogsServices.create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                sendNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
            })
    }

    const updateLikes = (id, blogObject) => {
        blogsServices.update(id, blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
            })
    }

    const deleteBlog = (blog) => {
        const deleteBlogID = blog.id
        blogsServices.remove(deleteBlogID)
            .then(() => {
                setBlogs(blogs.filter(blog => blog.id !== deleteBlogID))
            })
    }

    if (user === null) {
        return (
            <div>
                <Notification notification={notification} />
                <LoginForm handleLogin={handleLoginSubmit} username={username}
                           setUsername={setUsername} password={password} setPassword={setPassword} />
            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification notification={notification}/>
            <div>
                <p>{user.name} logged in
                    <button onClick={logout}> Logout </button>
                </p>
            </div>
            <h2> Create new </h2>
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog}/>
            </Togglable>
            {blogs.sort((x, y) => y.likes - x.likes)
                  .map(blog =>
                    <Blog key={blog.id} blog={blog} updateLikes={updateLikes} user={user} deleteBlog={deleteBlog}/>
                )}
        </div>
    )
}

export default App