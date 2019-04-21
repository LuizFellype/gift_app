import { VARIABLES } from './variables'
import { MESSAGES } from './messages'
import { Storage } from '../services'

const userSaved = Storage.get(VARIABLES.USER_KEY)
const { AUTH, PARTNER, GENERIC } = MESSAGES.ERRORS

export const validations = {
  isEmail: str =>
    /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str),
  partnerResponse: (setMessage, resposne) => {
    const { data, errors } = resposne
    if (!data) {
      switch (errors.message) {
        case 'User already connected with someone else':
          setMessage(PARTNER.CONNECTED())
          return false
        case 'You are connected with someone else':
          setMessage(PARTNER.CONNECTED(userSaved.user.name))
          return false
        case 'You are not connected with someone':
          setMessage(PARTNER.IM_ALONE)
          return false
        case 'No such user found':
          setMessage(PARTNER.NOT_FOUND)
          return false
        case 'Not Authenticated':
          setMessage(AUTH.NOT_AUTHENTICATED)
          return false
        default:
          setMessage(GENERIC.CONTENT)
          return false
      }
    }
    const user = {
      ...userSaved,
      user: { ...userSaved.user, partner: data.addPartner.partner }
    }
    Storage.set(VARIABLES.USER_KEY, user)
    return true
  }
}
