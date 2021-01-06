import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { getFiles } from '../../utils/storage/getFiles'

const listFile = async (req, res) => {
  const token = req.headers.token

  try {
    const verifideToken = await verifyIdToken(token)
    const uid = verifideToken.uid

    const [files] = await getFiles(uid.toLowerCase())

    return res.status(200).json({
      fileList: files
    })
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default listFile
