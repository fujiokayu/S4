import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'
import { firebaseApp } from '../firebase/initFirebase'

const db = getFirestore(firebaseApp)
const userRef = collection(db, 'user')

interface IUserList {
  uid: string,
  email: string
}

export const getUsers = async () => {
  try {
    const userQuerySnapshot = await getDocs(userRef)
    
    let userList: IUserList[] = new Array()

    if (userQuerySnapshot.size > 0) {
      userQuerySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        const user: IUserList = {
          uid: doc.data().uid,
          email: doc.data().email
        }
        userList.push(user)
      })
    }
    return userList
  } catch(error) {
    console.log(error)
  }

  return
}

export const exists = async (id) => {
  const q = query(userRef, where('id', '==', id))
  const querySnapshot = await getDocs(q)
  if (querySnapshot.size > 0) {
    return true
  }
  return false
}
