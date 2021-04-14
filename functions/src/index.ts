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
    const userQuerySnapshot = await userRef.where('email', '==', user.email).get()

    // いずれのデータベースにも登録されていないユーザーのサインアップは無効化する
    if ( adminQuerySnapshot.size === 0 && invitedQuerySnapshot.size === 0) {
      return admin.auth()
      .updateUser(user.uid, {disabled: true})
      .then(userRecord => console.log(`Auto blocked user: ${userRecord.toJSON()}`))
      .catch(error => console.log(`Error auto blocking: ${error}`))
    }

    if (userQuerySnapshot.size > 0) {
      // 既に登録済みのユーザーがサインアップするのは運用上の不整合であるため、エラーレポートを行う
      console.error('existing user: ', user.email, ', skip this insert.')
      return
    }

    if (adminQuerySnapshot.size > 0) {
      console.log('set admin claim with: ', user.email )
      await admin.auth().setCustomUserClaims(user.uid, { admin: true })
      return // admin user は user ドキュメントに追加しない
    }

    console.log('create user: ', user.email )
    const date = admin.firestore.Timestamp.fromDate(new Date())
    await userRef.add({
      uid: user.uid,
      email: user.email,
      registered: date,
    })
  })
/*
exports.onDeleteUser = functions.auth.user().onDelete((user) => {
  // ...
});
*/