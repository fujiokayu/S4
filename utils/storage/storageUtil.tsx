import { getStorage, ref, listAll } from 'firebase/storage'
import { firebaseApp } from '../firebase/initFirebase'

const storage = getStorage(firebaseApp)

export const listAllFiles = async (uid: string) => {
  try {
    const listRef = ref(storage, uid)
    return await listAll(listRef)
  } catch(error) {
    console.error('list file error:', error)
    throw error
  }
}

export const fileExists = async (uid: string, fileName: string) => {
  try {
    const files = await listAllFiles(uid)
    return files.items.some(file => file.name === fileName)
  } catch(error) {
    console.error('file exists check error:', error)
    throw error
  }
}
