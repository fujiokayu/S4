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
      <div class="siimple-jumbotron-title">Welcome page</div>
      <div class="siimple-jumbotron-detail">
        <p>You're signed in. Email: {user.email}</p>
        <p
          style={{
            display: 'inline-block',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => logout()}
        >
          Log out
        </p>
      </div>
      <div class="siimple-link">
        <Link href={'/example'}>
          <a>Another example page</a>
        </Link>
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
    </div>
  )
}

export default Index
