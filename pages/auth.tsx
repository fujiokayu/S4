import FirebaseAuth from '../components/FirebaseAuth'

const Auth = () => {
  return (
    <div>
      <p>Sign in to Secure Storage</p>
      <p className="siimple-paragraph" style={{textAlign: "center",}}>招待されていないユーザーはご利用できません。</p>
      <div>
        <FirebaseAuth />
      </div>
    </div>
  )
}

export default Auth
