import axios from 'axios'
const URL = 'api/persons/'

const getAll = () => {
    const request = axios.get(URL)
    return request.then(response => response.data)
}

const add = newObject => {
    const request = axios.post(URL, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const deleteUrl = URL + id
    const request = axios.delete(deleteUrl)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const updateUrl = URL + id
    const request = axios.put(updateUrl, newObject)
    return request.then(response => response.data)
}

export default {getAll, add, remove, update}