import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth as auth } from '../utils/firebase/initFirebase'
import { setUserCookie } from '../utils/auth/userCookies'
import { mapUserData } from '../utils/auth/mapUserData'
import styles from './FirebaseAuth.module.scss'

const FirebaseAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const userData = await mapUserData(result.user)
      setUserCookie(userData)
      router.push('/')
    } catch (error) {
      console.error('Google sign in error:', error)
    }
  }

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const userData = await mapUserData(result.user)
      setUserCookie(userData)
      router.push('/')
    } catch (error) {
      console.error('Email sign in error:', error)
    }
  }

  return (
    <div className={styles.container}>
      <button 
        onClick={signInWithGoogle}
        className={styles.googleButton}
      >
        Sign in with Google
      </button>

      <div className={styles.orDivider}>OR</div>

      <form onSubmit={signInWithEmail} className={styles.emailForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign in with Email</button>
      </form>
    </div>
  )
}

export default FirebaseAuth
