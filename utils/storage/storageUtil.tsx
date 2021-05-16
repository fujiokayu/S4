import firebase from 'firebase/app'

export const listAll = async (uid: string) => {
  try {
    const listRef = firebase.storage().ref(uid)
    return await listRef.listAll()
  } catch(error) {
    alert('list file error: ' + error.message)
  }

  return
}

export const fileExists = async (uid: string, fileName: string) => {
  try {
    let result = false
    const files = await listAll(uid)
    files.items.map(async file => {
      if (file.name == fileName) {
        result = true
      }
    })
    return result  
  } catch(error) {
    alert('list file error: ' + error.message)
  }

  return
}
