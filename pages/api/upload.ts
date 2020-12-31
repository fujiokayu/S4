import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { uploadFile } from '../../utils/storage/uploadFile'

const upload = async (req, res) => {
  const token = req.headers.token
  const source = req.headers.source
  console.log('token: ', token)
  console.log('source: ', source)

  try {
    await verifyIdToken(token)
    
    console.log('success verifyIdToken')
    await uploadFile(source)
    return res.status(200)
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default upload
