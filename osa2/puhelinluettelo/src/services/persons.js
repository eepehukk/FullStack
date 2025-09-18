import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deletePerson = deleteId => {
  return axios.delete(`${baseUrl}/${deleteId}`)
}

const update = (updateId, updatePerson) => {
    return axios.put(`${baseUrl}/${updateId}`, updatePerson).then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create,
  deletePerson: deletePerson,
  update: update
}