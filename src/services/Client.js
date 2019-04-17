import { Storage } from './Storage'
import { meQ } from './requests/Queries'
import { loginM, singup, post } from './requests/Mutation'
import { VARIABLES } from '../utils'

const user = Storage.get(VARIABLES.USER_KEY)
const url = 'https://giftme-api.herokuapp.com/'

const request = async (query = loginM(), headers = {}) => {
  // console.log({ query })
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: (user || { token: '' }).token,
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify({ query })
  })
  const { data, errors } = await response.json()
  // console.log({ data, errors, response })
  // console.log('--------------------')

  return { data, errors, response }
}

export const login = async (email, password) => {
  const loginData = { email, password }
  const { data, errors } = await request(loginM(loginData))
  if (!data) return errors
  Storage.set(VARIABLES.USER_KEY, data.login)
  return true
}

export const regiserUser = (name, email, password) =>
  request(singup({ name, email, password }))

export const createPost = (productName, placeReference) =>
  request(post({ name: productName, placeReference }))

export const me = () => request(meQ())
