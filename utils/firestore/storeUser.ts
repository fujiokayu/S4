import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()
const userRef = firestore.collection('user')

export const storeUser = async (user) => {
  // register db
  // generate bucket
  try {
    const docRef = await userRef.add({
        id: user.id,
        email: user.email
      }).catch(function(error) {
        console.error("Error adding document: ", error)})
      console.log("Document written with ID: ", docRef);
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