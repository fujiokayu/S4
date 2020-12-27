import * as admin from 'firebase-admin'
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

export const getFiles = (token) => {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    })
  }

  const bucket = admin.storage().bucket();
  return admin
    .storage()
    .bucket()
    .getFiles()
    .catch((error) => {
      throw error
    })
}