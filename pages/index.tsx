import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import List from '../components/List'
import Upload from '../components/Upload'
import { useFileUpload } from 'use-file-upload'

const Index = () => {
  const { user, logout } = useUser()
  const [file, selectFile] = useFileUpload()

  if (!user) {
    return (
      <>
        <p>Hi there!</p>
        <p>
          You are not signed in.{' '}
          <Link href={'/auth'}>
            <a>Sign in</a>
          </Link>
        </p>
      </>
    )
  }

  return (
    <div>
      <div class="siimple-jumbotron-title">Welcome storage</div>
      <div class="siimple-jumbotron-detail">
        <p>signed in : {user.email}</p>
        <p
          style={{
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => logout()}
        >
          Log out
        </p>
      </div>
      <List user={user}/>
      <div>
        <button class="siimple-btn siimple-btn--success"
          onClick={() => {
            // Single File Upload
            selectFile({}, ({ source, name, size, file }) => {
              // file - is the raw File Object
            })
          }}
        >
          select file to upload
        </button>

        {file && (
          <div>
            <span> Name: {file.name} </span>
            <span> Size: {file.size} </span>
            <Upload user={user} file={file}/>
          </div>
        )}
      </div>
      <div class="siimple-footer" align="center">
        <Link href={'/example'}>
          <a>privacy policy</a>
        </Link>
      </div>

    </div>
  )
}

export default Index
