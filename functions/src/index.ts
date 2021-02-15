import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://lobster-97151.firebaseio.com',
})
const adminRef = admin.firestore().collection('administrators')
const invitedRef = admin.firestore().collection('invited')
const userRef = admin.firestore().collection('user')

exports.setCustomClaim = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    const adminQuerySnapshot = await adminRef.where('email', '==', user.email).get()
    const invitedQuerySnapshot = await invitedRef.where('email', '==', user.email).get()

    // いずれのデータベースにも登録されていないユーザーのサインアップは無効化する
    if ( adminQuerySnapshot.size === 0 && invitedQuerySnapshot.size === 0) {
      return admin.auth()
      .updateUser(user.uid, {disabled: true})
      .then(userRecord => console.log(`Auto blocked user: ${userRecord.toJSON()}`))
      .catch(error => console.log(`Error auto blocking: ${error}`))
    }

    if (adminQuerySnapshot.size > 0) {
      console.log('set admin claim with: ', user.email )
      await admin.auth().setCustomUserClaims(user.uid, { admin: true })
    }

    if (invitedQuerySnapshot.size > 0) {
      console.log('create user: ', user.email )
      await userRef.add({
        id: user.uid,
        email: user.email,
      })
    }
  })
/*
exports.onDeleteUser = functions.auth.user().onDelete((user) => {
  // ...
});
*/