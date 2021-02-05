import { Storage } from '@google-cloud/storage';
import { verifyIdToken } from '../../utils/auth/firebaseAdmin'

const upload = async (req, res) => {
  const file = req.headers.name
  const encodedSource: string = req.body

  const verifideToken = await verifyIdToken(req.headers.token)
  const path = verifideToken.uid + '/' + file

  try {
    const storage = new Storage({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      credentials: {
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    })
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
    const file = bucket.file(path)
    return new Promise((resolve, reject) => {
      file.save(encodedSource)
      .then(response => {
        res.statusCode = 200
        res.end(JSON.stringify(response))
        return res
      })      
      .catch(error => {
        res.json(error);
        res.status(405).end();
        return reject()
      })
    })

    return res.status(200)
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default upload
