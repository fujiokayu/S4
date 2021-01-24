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

exports.setCustomClaim = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    const querySnapshot = await adminRef.where('email', '==', user.email).get()
    if (querySnapshot.size > 0) {
      console.log('set admin claim with: ', user.email )
      await admin.auth().setCustomUserClaims(user.uid, { admin: true })
      return
    }

    console.log('create user: ', user.email)
    return
  })
/*
exports.onDeleteUser = functions.auth.user().onDelete((user) => {
  // ...
});
*/