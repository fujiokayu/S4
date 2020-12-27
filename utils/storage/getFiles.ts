import * as admin from 'firebase-admin'
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

export const getFiles = (token) => {
  const bucket = admin.storage().bucket();
  return admin
    .storage()
    .bucket()
    .getFiles()
    .catch((error) => {
      throw error
    })
}