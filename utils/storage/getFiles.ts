import * as admin from 'firebase-admin'

export const getFiles = (path) => {
  return admin
    .storage()
    .bucket()
    .getFiles(path)
    .catch((error) => {
      throw error
    })
}