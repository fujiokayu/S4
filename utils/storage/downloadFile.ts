import * as admin from 'firebase-admin'

export const downloadFile = async (path) => {
  return await admin
    .storage()
    .bucket()
    .file(path)
    .download()
}