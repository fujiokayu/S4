import * as admin from 'firebase-admin'

export const getFiles = (name) => {
  return admin
    .storage()
    .bucket(name)
    .getFiles()
    .catch((error) => {
      throw error
    })
}