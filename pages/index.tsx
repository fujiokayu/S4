import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import List from '../components/List'
import Upload from '../components/Upload'
import { getUsers } from '../utils/firestore/getUsers'
import React from 'react'
import Select from 'react-select'

export const uidContext = React.createContext('')

const Index = () => {
  const { user, logout } = useUser()
  const [options, setOptions] = React.useState([])
  const [uid, setUid] = React.useState<string>()

  const onChange = (value) => {
    setUid(value.value)
    console.log(value.value)
  }

  React.useEffect(() => {
    if (user && user.admin && options.length === 0) {
      console.log('admin')
      setUid(user.id)
      getUsers().then( (list) => {
        // Sign-out successful.
        console.log('list', list)
        list.forEach((row) => {
          const newValue = { value: row.uid, label: row.email.toLowerCase() }
          options.push(newValue)
        })
      } )
    }
    else if (user && !uid) {
      console.log('elif: ', uid)
      setUid(user.id)
    }
  }, [user])

  if (!user) {
    return (
      <>
        <p className="siimple-jumbotron-title">Sign in してからご利用ください。</p>
        <p className="siimple-tip siimple-tip--warning siimple-tip--exclamation">
          email に送られた確認コードにアクセスしていない場合もこのページが表示されます。{' '}
          <Link href={'/auth'}>
            <a>Sign in</a>
          </Link>
        </p>
      </>
    )
  }
  return (
    <div>
      <div className="siimple-jumbotron-title">secure storage</div>
      <div className="siimple-jumbotron-detail">
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
      {options.length > 0 ? (
          <Select options={options} onChange={(onChange)}/>
      ) : (
        <p>signed in : {user.email}</p>
      )}
      <uidContext.Provider value={uid}>
        <List user={user}/>
        <Upload user={user}/>
      </uidContext.Provider>
      <div className="siimple-footer" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Link href={'/privacyPolicy'}>
          <a className="siimple-paragraph">privacy policy</a>
        </Link>
      </div>
    </div>
  )
}

export default Index
