import { exists, storeUser } from '../firestore/storeUser'
import useSWR from 'swr'

export const setBucket = async (user) => {
  try {
    const exist = await exists(user.id)
    
    if (exist) {
      console.log('exists: ', user.id)
        // cannot use uppercase for Bucket name 
        return user.id.toLowerCase()
    }

    await storeUser(user)

    const response = await fetch("/api/create", {
      method: 'POST',
      headers: new Headers({ 
        'Content-Type': 'multipart/form-data', 
        'token': user.token}),
      credentials: 'same-origin'
      // Todo: API resolved without sending a response for /api/create, this may result in stalled requests.
    })

    console.log('create Bucket responce: ', response)
  } catch (error) {
    console.error('setBucket Exception: ', error)
  }
}

export default setBucket
