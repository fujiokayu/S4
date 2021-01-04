import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { createBucket } from '../../utils/storage/createBucket'

const upload = async (req, res) => {
  const token = req.headers.token
  const id = req.headers.id

  try {
    await verifyIdToken(token)
    
    console.log('success verifyIdToken')
    await createBucket(id)
    return res.status(200)
  } catch (error) {
    console.log(error)
    return res.status(500).send('create Bucket failed')
  }
}

export default upload
