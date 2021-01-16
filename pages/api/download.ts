import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { downloadFile } from '../../utils/storage/downloadFile'

const download = async (req, res) => {
  const token: string = req.headers.token
  const fileName: string = req.headers.filename

  try {
    const verifideToken = await verifyIdToken(token)
    const path: string = verifideToken.uid + '/' + fileName

    const data = await downloadFile(path)
    const base64String = data.toString()

    console.log(base64String.length)
    // Todo: res.setHeader(Proper Content-Type)
    return res.status(200).send(base64String)
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default download
