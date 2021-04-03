import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import { useRouter } from 'next/router'
import initFirebase from '../utils/firebase/initFirebase'
import { setUserCookie } from '../utils/auth/userCookies'
import { mapUserData } from '../utils/auth/mapUserData'

// Init the Firebase app.
initFirebase()

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ( { user }, redirectUrl ) => {
      if ( user.emailVerified ) {
        const userData = await mapUserData( user )
        setUserCookie( userData )
        return
      }
      await user.sendEmailVerification()
      const router = useRouter()
      firebase
        .auth()
        .signOut()
        .then( () => {
          // Sign-out successful.
          router.push( '/auth' )
        } )
        .catch( ( e ) => {
          alert( e )
        } )
    },
  },
}

const FirebaseAuth = () => {
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  )
}

export default FirebaseAuth
