const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
let authorization

beforeEach(async () => {
    const newUser = {
        username: 'testUser',
        name: 'Test User',
        password: 'password',
    }
    await api.post('/api/users').send(newUser)
    const result = await api.post('/api/login').send(newUser)
    authorization = `bearer ${result.body.token}`
})

describe('bloglist tests', () => {

    test('blogs returned are json and length is 3', async () => {
        const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
        expect(Object.keys(response.body).length === 3)
    })

    test('blogs can be added', async () => {
        const beforeResponse = await api.get('/api/blogs')
        const responseLength = Object.keys(beforeResponse.body).length
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
        }

        await api.post('/api/blogs').send(newBlog).set('Authorization', authorization).expect(201).expect('Content-Type', /application\/json/)

        const afterResponse = await api.get('/api/blogs')
        const title = afterResponse.body.map(v => v.title)
        expect(responseLength === responseLength + 1)
        expect(title).toContain('Go To Statement Considered Harmful')
    })

    test('correct id of blog exists', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })


    test('if blog have zero likes', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        }

        await api.post('/api/blogs').send(newBlog).set('Authorization', authorization).expect(201).expect('Content-Type', /application\/json/)

        const responseAfter = await api.get('/api/blogs')
        expect(responseAfter.body.at(-1).likes === 0)
    })

    test('if url and title are empty return 400', async () => {
        const newBlog = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        await api.post('/api/blogs').send(newBlog).set('Authorization', authorization).expect(400)
    })

    test('specific blog can be deleted', async () => {
        const response = await api.get('/api/blogs')
        const deleteID = response.body.at(-1).id
        await api.delete(`/api/blogs/${deleteID}`).set('Authorization', authorization).expect(204)
    })

    test('specific blog can be updated', async () => {
        const response = await api.get('/api/blogs')
        const putID = response.body.at(-1).id
        const updateLikes = {
            likes: 199
        }
        await api.put(`/api/blogs/${putID}`).send(updateLikes).expect(200)

        const responseAfter = await api.get('/api/blogs')
        expect(responseAfter.body.at(-1).likes === 199)
    })

    test('if username is less than three characters return error 400', async () => {
        const newUser = {
            username: 'He',
            name: 'Arto Hellas',
            password: 'test123'
        }
        await api.post('/api/users').send(newUser).expect(400)
    })
    test('if password is less than three characters return error 400', async () => {
        const newUser = {
            username: 'Hellas',
            name: 'Arto Hellas',
            password: 't'
        }
        await api.post('/api/users').send(newUser).expect(400)
    })

    test('if username already exists return error 400', async () => {
        const newUser = {
            username: 'hellas',
            name: 'Arto Hellas',
            password: 'test123'
        }
        await api.post('/api/users').send(newUser).set('Authorization', authorization).expect(201).expect('Content-Type', /application\/json/)

        const errorUser = {
            username: 'hellas',
            name: 'Arto Hellas',
            password: 'test123'
        }
        await api.post('/api/users').send(errorUser).set('Authorization', authorization).expect(400)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})

