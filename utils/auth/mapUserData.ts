import 'firebase/auth'

export const mapUserData = async (user) => {
  const { uid, email } = user
  const token = await user.getIdToken(true)
  
  const result = await user.getIdTokenResult(true)
  const isAdmin: boolean = result.claims.admin ? true : false

  return {
    id: uid,
    email: email,
    token: token,
    admin: isAdmin
  }
}
