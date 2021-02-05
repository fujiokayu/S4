import { getStorage } from '../../utils/storage/firebaseStorage';

const upload = async (req, res) => {
  try {
    const file = req.headers.filename

    const storage = getStorage()
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
    const storageFile = bucket.file(file)
    return new Promise((resolve, reject) => {
      storageFile.delete()
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
