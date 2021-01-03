import { exists, storeUser } from '../firestore/storeUser'
import useSWR from 'swr'

export const setBucket = async (user) => {
  try {
    const exist = await exists(user.id)
    
    if (exist) {
      return user.id
    }

    await storeUser(user)
    const fetcher = (url, token) =>
    fetch(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', token }),
      credentials: 'same-origin',
    }).then((res) => res.json())

    const { data, error } = useSWR(
      ['/api/create', user.token],
      fetcher
    )
  } catch (error) {
  }
}

export default setBucket
