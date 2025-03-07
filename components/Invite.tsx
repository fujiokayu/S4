import { useState, FormEvent } from 'react'
import { getFirestore, collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore'
import { firebaseApp } from '../utils/firebase/initFirebase'

const firestore = getFirestore(firebaseApp)
const invitedRef = collection(firestore, 'invited')

interface IValue {
  input: string,
  message: string,
  disabled: boolean
}

const isInvited = async (value: string) => {
  const q = query(invitedRef, where('email', '==', value))
  const invitedQuerySnapshot = await getDocs(q)
  .catch(function(error) {
    alert('Firestore の読み込みに失敗しました: ' + error.message)
    throw new Error(error) 
  })

  // オフライン時もエラーレコードが格納されているため重複と判定される・・・
  if (invitedQuerySnapshot && invitedQuerySnapshot.size > 0) {
    return true
  }
  return false
}

const Invite = () => {
  const [value, setValue] = useState<IValue>({
    input: '',
    message: '',
    disabled: true
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value;
    const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]/
    if (address === '') {
      setValue({
        input: address, 
        message: '',
        disabled: true
      })
      return
    }

    if (!regex.test(address)) {
      setValue({
        input: address, 
        message: '正しいフォーマットで入力してください',
        disabled: true
      })
      return
    }
    setValue({
      input: address, 
      message: '',
      disabled: false
    })  
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    
    try {
      if (await isInvited(value.input)) {
        alert('既に招待済みの email アドレスです')
        return
      }
      const date = Timestamp.fromDate(new Date())
      await addDoc(invitedRef, {
        email: value.input,
        registered: date,
      })
    }
    catch (e) {
      alert('Firestore へのアクセスが失敗しました。\nネットワーク接続を確認してください。')
    } 

    alert(value.input + ' を招待できるようになりました。\nこのサイトの URL を連絡してください。')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label className="siimple-field-label">ファイルを共有したいユーザーのアドレスを追加してください
          <input
            className="siimple-input siimple-input--fluid" 
            placeholder="foobar@company.com"
            type="text"
            value={value.input}
            onChange={event => handleChange(event)}
          />
          {value.message && (
            <p className="siimple-tip siimple-tip--warning siimple-tip--exclamation" style={{ color: 'red', fontSize: 12, backgroundColor: 'rgba(255, 239, 192, 1)' }}>
            {value.message}</p>
          )}

        </label>
        {value.disabled ? (
          <button className="siimple-btn siimple-btn--primary siimple-btn--disabled" disabled={value.disabled} type="submit">登録する</button>
        ): (
          <button className="siimple-btn siimple-btn--primary" type="submit">登録する</button>
        )}
      </form>
    </div>
  )
}

export default Invite
