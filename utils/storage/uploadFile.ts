import * as admin from 'firebase-admin'

export const uploadFile = async (path, source) => {
  return await admin
    .storage()
    .bucket()
    .file(path)
    .save(source)
    .catch((error) => {
      throw error
    })
}