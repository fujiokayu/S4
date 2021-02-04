import { verifyIdToken } from '../../utils/auth/firebaseAdmin'
import { uploadFile } from '../../utils/storage/uploadFile'

const upload = async (req, res) => {
  const token = req.headers.token
  const file = req.headers.name.replace(/^.*[\\\/]/, '')
  const encodedSource: string = req.body

  try {
    const verifideToken = await verifyIdToken(token)
    const path = verifideToken.uid + '/' + file

    console.log('upload path', path)
    return new Promise((resolve, reject) => {
      uploadFile(path, encodedSource)
      .then(response => {
        res.statusCode = 200
        res.end(JSON.stringify(response))
        return res
      })      
      .catch(error => {
        res.json(error);
        res.status(405).end();
        return reject()
      })
    })
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default upload
