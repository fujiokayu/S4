import { getStorage } from '../../utils/storage/firebaseStorage';
import { verifyIdToken } from '../../utils/auth/firebaseAdmin'

const upload = async (req, res) => {
  try {
    const file = req.headers.name
    const encodedSource: string = req.body

    const verifideToken = await verifyIdToken(req.headers.token)
    const path = verifideToken.uid + '/' + file

    const storage = getStorage()
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
    const storageFile = bucket.file(path)
    return new Promise((resolve, reject) => {
      storageFile.save(encodedSource)
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
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default upload
