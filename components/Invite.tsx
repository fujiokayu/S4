import {useState, FormEvent} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()
const invitedRef = firestore.collection('invited')

interface IValue {
  input: string,
  message: string,
  disabled: boolean
}

const isInvited = async (value: string) => {
  const invitedQuerySnapshot = await invitedRef.where('email', '==', value).get()
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
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]/
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
      const date = firebase.firestore.Timestamp.fromDate(new Date())
      await invitedRef.add({
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
        <label className="siimple-field-label">ユーザー追加
          <input
            className="siimple-input siimple-input--fluid" 
            placeholder="foobar@company.com"
            type="text"
            value={value.input}
            onChange={event => handleChange(event)}
          />
          {value.message && (
            <p style={{ color: 'red', fontSize: 8 }}>{value.message}</p>
          )}

        </label>
        {value.disabled ? (
          <button className="siimple-btn siimple-btn--primary siimple-btn--disabled" disabled={value.disabled} type="submit">Invite</button>
        ): (
          <button className="siimple-btn siimple-btn--primary" type="submit">Invite</button>
        )}
      </form>
    </div>
  )
}

export default Invite
