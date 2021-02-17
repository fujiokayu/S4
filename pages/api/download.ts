import { getStorage } from '../../utils/storage/firebaseStorage'

const download = async (req, res) => {
  const fileName: string = req.headers.filename

  try {
    const storage = getStorage()
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
    const file = bucket.file(fileName);

    const data = await file.download()

    // Todo: res.setHeader(Proper Content-Type)
    return res.status(200).send(data[0])
  } catch (error) {
    console.log(error)
    return res.status(500).send('download error: ', error.massage)
  }
}

export default download
