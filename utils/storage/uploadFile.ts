import * as admin from 'firebase-admin'
const filePath = 'test/some.jpg';

export const uploadFile = (source) => {
  return admin
    .storage()
    .bucket()
    .file(filePath)
    .save(source)
    .catch((error) => {
      throw error
    })
}