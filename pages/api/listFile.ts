import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { getFiles } from '../../utils/storage/getFiles'
import * as admin from 'firebase-admin'

const listFile = async (req, res) => {
  const token = req.headers.token

  try {
    const verifiedToken = await verifyIdToken(token)
    const user = await admin.auth().getUser(verifiedToken.uid)
    let path: string = verifiedToken.uid
    if (user.customClaims && user.customClaims.admin === true) {
      path = ''
    }

    const [files] = await getFiles(path)
    return res.status(200).json({
      fileList: files
    })
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default listFile
