import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import List from '../components/List'

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
    </div>
  )
}

export default Index
