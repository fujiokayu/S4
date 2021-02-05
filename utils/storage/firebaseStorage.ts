import { Storage } from '@google-cloud/storage';

export const getStorage = () => {
  return new Storage({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    credentials: {
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
  })
}
