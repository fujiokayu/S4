import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { createBucket } from '../../utils/storage/createBucket'

const metadata = {
  'userProject': process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
}

const upload = async (req, res) => {
  const token = req.headers.token

  try {
    const verifideToken = await verifyIdToken(token)
    const uid = verifideToken.uid
    
    console.log('success verifyIdToken')
    await createBucket(uid, metadata)
    return res.status(200)
  } catch (error) {
    console.log(error)
    return res.status(500).send('create Bucket failed')
  }
}

export default upload
