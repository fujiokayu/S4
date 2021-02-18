import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
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
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ( { user }, redirectUrl ) => {
      if ( firebase.auth().currentUser.emailVerified ) {
        const userData = await mapUserData( user )
        setUserCookie( userData )
        return
      }
      await firebase.auth().currentUser.sendEmailVerification()
      firebase
        .auth()
        .signOut()
        .then( () => {
          // Sign-out successful.
          router.push( '/auth' )
        } )
        .catch( ( e ) => {
          console.error( e )
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
