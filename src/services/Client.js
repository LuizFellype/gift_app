import { Storage } from './Storage'
import { meQ } from './requests/Queries'
import { loginM, singup, post, addPartnerM } from './requests/Mutation'
import { VARIABLES } from '../utils/variables'

const user = Storage.get(VARIABLES.USER_KEY)
const getId = () => (user ? user.user.id : '')
const getToken = () => (user ? user.token : '')

const request = async (query = loginM(), headers = {}) => {
  // console.log({ query })
  const response = await fetch(VARIABLES.URL, {
    method: 'POST',
    headers: {
      Authorization: getToken(),
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
}

export const regiserUser = (name, email, password) =>
  request(singup({ name, email, password }))

export const createPost = (productName, placeReference) =>
  request(post({ name: productName, placeReference }))

export const addPartner = recognizeId =>
  request(addPartnerM(JSON.stringify(recognizeId)))
export const me = () => request(meQ(JSON.stringify(getId())))
export const isAuthenticated = () => !!Storage.get(VARIABLES.USER_KEY)
