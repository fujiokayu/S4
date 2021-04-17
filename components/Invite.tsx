import {useState, FormEvent} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()
const invitedRef = firestore.collection('invited')

const isInvited = async (value: string) => {
  const invitedQuerySnapshot = await invitedRef.where('email', '==', value).get()
  .catch(function(error) {
    alert('Firestore の読み込みに失敗しました: ' + error)
    throw new Error(error) 
  })

  // オフライン時もエラーレコードが格納されているため重複と判定される・・・
  if (invitedQuerySnapshot && invitedQuerySnapshot.size > 0) {
    return true
  }
  return false
}

const Invite = () => {
  const [value, setValue] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    
    try {
      if (await isInvited(value)) {
        alert('既に招待済みの email アドレスです')
        return
      }
      const date = firebase.firestore.Timestamp.fromDate(new Date())
      await invitedRef.add({
        email: value,
        registered: date,
      })
    }
    catch (e) {
      alert('Firestore へのアクセスが失敗しました。\nネットワーク接続を確認してください。')
    } 

    alert(value + ' を招待できるようになりました。\nこのサイトの URL を連絡してください。')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label className="siimple-field-label">ユーザー追加
          <input
            className="siimple-input siimple-input--fluid" 
            placeholder="foobar@company.com"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </label>
        <button className="siimple-btn siimple-btn--primary" type="submit">Invite</button>
      </form>
    </div>
  )
}

export default Invite
