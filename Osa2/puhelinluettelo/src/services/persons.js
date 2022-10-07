import axios from "axios"
const URL = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(URL);
  return request.then((response) => {
    return response.data
    })
  }

const create = (newObject) => {
  const request = axios.post(URL, newObject)
  return request.then((response) => {
    return response.data
  })
}

const remove = (id) => {
  const request = axios.delete(`${URL}/${id}`)
  return request.then((response) => {
    return response
  })
}

const update = (id, newObject) => {
  const request = axios.put(`${URL}/${id}`, newObject);
  return request.then((response) => {
    return response.data
  })
}

export default { getAll, create, remove, update }