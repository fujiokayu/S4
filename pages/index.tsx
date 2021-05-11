import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import WatchLoader from '../components/WatchLoader'
import List from '../components/List'
import Upload from '../components/Upload'
import Invite from '../components/Invite'
import VerifyEmail from '../components/VerifyEmail'
import { getUsers } from '../utils/firestore/getUsers'
import {useState, useEffect, createContext} from 'react'
import Select from 'react-select'
import { useRouter } from 'next/router'

export const uidContext = createContext('')

const Index = () => {
  const { user, logout } = useUser()
  const [options, setOptions] = useState([])
  const [uid, setUid] = useState<string>()
  const [uploaded, setUploaded] = useState(false)
  const router = useRouter()

  const onChange = (value) => {
    setUid(value.value)
  }
  const updateList = (isState) => {
    setUploaded(isState)
  }

  // Init ui
  useEffect(() => {
    if (user && user.admin && options.length === 0) {
      setUid(user.id)
      getUsers().then((list) => {
        const items = []
        list.forEach((row) => {
          const newValue = { value: row.uid, label: row.email.toLowerCase() }
          items.push(newValue)
        })
        setOptions(Array.from(new Set(items)))
      })
    }
    else if (user && !uid) {
      setUid(user.id)
    }
  }, [user])

  if (user && user.id == '') {
    router.push('/auth')
  }

  // サインアップ済み、かつ、Email 未認証
  if (user && user.id != '' && !user.verified) {
    return (
      <>
        <p className="siimple-jumbotron-title" style={{textAlign: 'center'}}>お使いのメールアドレスはまだ有効になっていません。</p>
        <VerifyEmail email={user.email}/>
      </>
    )
  }

  // 認証済みユーザー
  if (user && user.id != '' && user.verified) {
    return (
      <div>
        <p className="siimple-btn siimple-btn--grey" onClick={() => logout()}>
        サインアウト
        </p>
        {options.length > 0 ? (
          <Select options={options} onChange={(onChange)} placeholder='ファイルを共有するユーザーを選択してください'/>
          ) : (
          <p>サインイン: {user.email}</p>
        )}
        { (user.admin != true || user.id != uid) &&
          <uidContext.Provider value={uid}>
            <List updateList={updateList} uploaded={uploaded}/>
            <Upload updateList={updateList} user={user.email}/>
          </uidContext.Provider>
        }
        { user.admin == true &&
          <Invite />
        }
      </div>
    )
  }

  // ユーザー情報の取得中
  return (
    <div style={{textAlign: 'center'}}>
      <WatchLoader />
      <br/>
      <Link href={'/auth'}>
        <a className="siimple-link">サインイン</a>
      </Link>
    </div>
  )
}

export default Index
