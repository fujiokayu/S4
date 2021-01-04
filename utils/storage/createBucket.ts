import * as admin from 'firebase-admin'

export const createBucket = (id) => {
  return admin
  .storage()
  .bucket(id)
  .create().
  then(function(data) {
    const bucket = data[0]
    const apiResponse = data[1]
    console.log(data)
  }).catch((error) => {
    throw error
  })
}