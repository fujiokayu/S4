import { Storage } from '@google-cloud/storage';

const upload = async (req, res) => {
  const fileName = req.headers.name

  try {
    const storage = new Storage({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      credentials: {
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    })
    const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
    const file = bucket.file(fileName)
    const options = {
      expires: Date.now() + 1 * 60 * 1000, //  1 minute,
      fields: { 'x-goog-meta-ss': 'data' },
    };
  
    const [response] = await file.generateSignedPostPolicyV4(options);
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default upload
