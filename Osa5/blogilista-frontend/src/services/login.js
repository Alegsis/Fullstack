import axios from 'axios'

const login = async data => {
    const response = await axios.post('/api/login', data)
    return response.data
}

export default { login }