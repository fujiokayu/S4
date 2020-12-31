import * as admin from 'firebase-admin'

export const getFiles = () => {
  return admin
    .storage()
    .bucket()
    .getFiles()
    .catch((error) => {
      throw error
    })
}