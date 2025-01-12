import { FormEvent, useState } from 'react'
import { getAuth, sendEmailVerification } from 'firebase/auth'
import { firebaseApp } from '../utils/firebase/initFirebase'
import { confirmAlert } from 'react-confirm-alert'

const auth = getAuth(firebaseApp)

const VerifyEmail = (props) => {
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const user = auth.currentUser
      if (user === null) {
        alert('サインアップしてから実行してください。')
        return
      }
      await sendEmailVerification(user)
    }
    catch (e) {
      alert('確認コードの送信に失敗しました。サイファー・テックまでお問い合わせください。')
      if (e instanceof Error) {
        alert(e.message)
      }
      return
    } 

    alert('確認コードを送信しました。本文に記載されたリンクをクリックして確認してください。')
  }

  return (
    <div>
      <p className='siimple--color-black' style={{fontSize: 20, textAlign: 'center'}}>確認メールを送信し、メール本文に記載された URL をクリックしてアカウントを有効化してください。</p>
      <form onSubmit={onSubmit} style={{textAlign: 'center'}}>
        <label className="siimple-field-label" style={{fontSize: 30, color: "gray"}}>{props.email} に確認メールを送信する</label>
        <br />
        <button className="siimple-btn siimple-btn--primary siimple-btn--big" type="submit">送信</button>
      </form>
      <br />
      <p className='siimple--color-black' style={{fontSize: 20, textAlign: 'center'}}>確認メールが届かない場合は foobar Inc. までご連絡ください。</p>
    </div>
  )
}

export default VerifyEmail
