import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
  const [showMore, setShowMore] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = ({ blog }) => {
    const id = blog.id
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateLikes(id, updatedBlog)
  }

  const removeBlog = ({ blog }) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  const lessDetails = () => (
      <div className="blog" >
        {blog.title} {blog.author}
        <button id={blog.id} onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Hide' : 'View'}
        </button>
      </div>
  )

  const moreDetails = () => (
      <div className="blog" >
        {blog.title} {blog.author}
        <button id={blog.id} onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Hide' : 'View'}
        </button>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={() => addLike({ blog })}> Like </button>
        </div>
        <div>
          {blog.author}
        </div>
        {blog.user.id === user.id || blog.user.username === user.username
            ? <button onClick={() => removeBlog({ blog })}> Remove </button>
            : '' }
      </div>
  )

  return (
      <div style={blogStyle} className='blog'>
        {showMore ? moreDetails() : lessDetails()}
      </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog