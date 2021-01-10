import * as admin from 'firebase-admin'

export const uploadFile = (path, source) => {
  console.log(path)
  return admin
    .storage()
    .bucket()
    .file(path)
    .save(source)
    .catch((error) => {
      throw error
    })
}