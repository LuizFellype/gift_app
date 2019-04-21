import { VARIABLES } from './variables'
import { Storage } from '../services'

export const capitalize = word => {
  const letterUp = word[0].toUpperCase()
  const wordSeparated = [letterUp, ...word.slice(1)]
  return wordSeparated.join('')
}

export const backup = state => {
  const userSaved = Storage.get(VARIABLES.USER_KEY)
  if (!userSaved) return false
  const { partner } = userSaved.user
  const partnerData = partner
    ? { ...partner, products: state.partnerProducts }
    : partner
  const userData = {
    ...userSaved,
    user: {
      ...userSaved.user,
      products: state.userProducts,
      partner: partnerData
    }
  }

  Storage.set(VARIABLES.USER_KEY, userData)
  return true
}
