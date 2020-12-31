import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { getFiles } from '../../utils/storage/getFiles'
import * as admin from 'firebase-admin'

const listFile = async (req, res) => {
  const token = req.headers.token

  try {
    await verifyIdToken(token)
    const [files] = await getFiles()

    return res.status(200).json({
      fileList: files
    })
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default listFile
