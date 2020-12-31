import * as admin from 'firebase-admin'
const filePath = 'test/';

export const uploadFile = (name, source) => {
  return admin
    .storage()
    .bucket()
    .file(filePath + name)
    .save(source)
    .catch((error) => {
      throw error
    })
}