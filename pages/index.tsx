import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import List from '../components/List'
import Upload from '../components/Upload'

const Index = () => {
  const { user, logout } = useUser()
  
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
        <Link href={'/example'}>
          <a>privacy policy</a>
        </Link>
      </div>

    </div>
  )
}

export default Index
