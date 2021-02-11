import { getStorage } from '../../utils/storage/firebaseStorage'
import { Buffer } from 'buffer'

const download = async (req, res) => {
  const fileName: string = req.headers.filename

  try {
    const storage = getStorage()
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
    const file = bucket.file(fileName);

    const data = await file.download()
    const strData = data.toString()
    console.log('strData.length: ', strData.length)
    // Todo: res.setHeader(Proper Content-Type)
    return res.status(200).send(strData)
  } catch (error) {
    console.log(error)
    return res.status(500).send('download error: ', error.massage)
  }
}

export default download
