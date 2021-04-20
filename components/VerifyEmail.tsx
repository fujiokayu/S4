import {FormEvent} from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'

const VerifyEmail = () => {

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const user = firebase.auth().currentUser
      if (user === null) {
        alert('サインアップしてから実行してください。')
        return
      }
      await user.sendEmailVerification()
    }
    catch (e) {
      alert('確認コードの送信に失敗しました。サイファー・テックまでお問い合わせください。')
      alert(e.message)
      return
    } 

    alert('確認コードを送信しました。本文に記載されたリンクをクリックして確認してください。')
  }

  return (
    <div>
    <form onSubmit={onSubmit} >
      <label className="siimple-field-label">サインアップしたメールアドレスに確認コードを送信する</label>
      <button className="siimple--float-left siimple-btn siimple-btn--primary" type="submit">送信</button>
    </form>
    </div>
  )
}

export default VerifyEmail
