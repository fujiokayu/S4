import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()
const userRef = firestore.collection('user')

interface IUserList {
  uid: string,
  email: string
}

export const getUsers = async () => {
  try {
    console.log('getUsers!')

    const userQuerySnapshot: any = await userRef.get()
    .catch(function(error) {
      console.error("Error fetching user document: ", error)
    })
    
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
    console.log('userList: ', userList)  
    return userList
  } catch(error) {
    console.log(error)
  }

  return
}

export const exists = async (id) => {
  const querySnapshot = await userRef.where('id', '==', id).get()
  if (querySnapshot.size > 0) {
    return true
  }
  return false
}