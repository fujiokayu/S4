import useSWR from 'swr'
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
      <div>
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
      <div>
        <Link href={'/example'}>
          <a>Another example page</a>
        </Link>
      </div>
      <List user={user}/>
      <div>
        <button
          onClick={() => {
            // Single File Upload
            selectFile({}, ({ source, name, size, file }) => {
              // file - is the raw File Object
            })
          }}
        >
          Click to Upload
        </button>

        {file ? (
          <div>
            <img src={file.source} alt='preview' />
            <span> Name: {file.name} </span>
            <span> Size: {file.size} </span>
            <Upload user={user} file={file.source}/>
          </div>
        ) : (
          <span>No file selected</span>
        )}
      </div>
    </div>
  )
}

export default Index
