import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from "./BlogForm";

test('render blog title and author', () => {
    const blog = {
        title: 'testtitle1',
        author: 'testauthor1',
        likes: 123,
        url: 'testurl1.com'
    }
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.likes)
    expect(div).not.toHaveTextContent(blog.url)
})

test('pressing view button displays all blogpost details ', async () => {
    const blog = {
        title: 'testtitle1',
        author: 'testauthor1',
        likes: 123,
        url: 'testurl1.com',
        user: {
            username: 'testuser'
        }
    }
    const user = { username: 'testuser' }
    const { container } = render(<Blog blog={blog} user = {user}/>)
    const userPressing = userEvent.setup()
    const button = screen.getByText('View')
    await userPressing.click(button)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.likes)
    expect(div).toHaveTextContent(blog.url)
})

test('verifies like button getting pressed two times', async () => {
    const blog = {
        title: 'testtitle1',
        author: 'testauthor1',
        likes: 123,
        url: 'testurl1.com',
        user: {
            username: 'testuser'
        }
    }
    const user = { username: 'testuser' }
    const buttonClicks = jest.fn()
    const { container } = render(<Blog blog={blog} user = {user} updateLikes= {buttonClicks}/>)
    const userPressing = userEvent.setup()
    const viewButton = screen.getByText('View')
    await userPressing.click(viewButton)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.likes)
    expect(div).toHaveTextContent(blog.url)

    const buttonLike = screen.getByText('Like')
    await userPressing.click(buttonLike)
    await userPressing.click(buttonLike)

    expect(buttonClicks.mock.calls).toHaveLength(2)
})
test('Verify props have correct values when blog is created', async () => {
    const createBlog = jest.fn()
    render(<BlogForm createBlog={createBlog} />)
    const inputTitle = screen.getByPlaceholderText('Title')
    const inputAuthor = screen.getByPlaceholderText('Author')
    const inputUrl = screen.getByPlaceholderText('Url')
    const buttonCreate = screen.getByText('Create')
    await userEvent.type(inputTitle, 'testtitle1' )
    await userEvent.type(inputAuthor, 'testauthor1' )
    await userEvent.type(inputUrl, 'testurl1.com' )
    await userEvent.click(buttonCreate)

    expect(createBlog.mock.calls[0][0].title).toBe('testtitle1')
    expect(createBlog.mock.calls[0][0].author).toBe('testauthor1')
    expect(createBlog.mock.calls[0][0].url).toBe('testurl1.com')
})
