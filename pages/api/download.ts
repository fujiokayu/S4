import { Storage } from '@google-cloud/storage';

const download = async (req, res) => {
  const fileName: string = req.headers.filename

  try {
    const storage = new Storage({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      credentials: {
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    });
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
    const file = bucket.file(fileName);

    const data = await file.download()
    const base64String = data.toString()

    console.log(base64String.length)
    // Todo: res.setHeader(Proper Content-Type)
    return res.status(200).send(base64String)
  } catch (error) {
    console.log(error)
    return res.status(500).send('download error: ', error.massage)
  }
}

export default download
