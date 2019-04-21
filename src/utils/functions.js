import { VARIABLES } from './variables'
import { Storage, me } from '../services'

export const capitalize = word => {
  const letterUp = word[0].toUpperCase()
  const wordSeparated = [letterUp, ...word.slice(1)]
  return wordSeparated.join('')
}

export const syncData = async createPost => {
  // send data added offline
  const userSaved = Storage.get(VARIABLES.USER_KEY)
  const addedLocally = Storage.get(VARIABLES.LOCALPRODUCTS_KEY)
  if (addedLocally && addedLocally.length > 0) {
    await addedLocally.map(async product => {
      await createPost(product)
    })
  }
  const userUpdatedResp = await me()
  if (!userUpdatedResp.data) return userUpdatedResp

  const newUserData = { ...userSaved, user: { ...userUpdatedResp.data.user } }
  Storage.set(VARIABLES.USER_KEY, newUserData)

  return userUpdatedResp
}
