import initFirebase from '../utils/firebase/initFirebase'
import firebase from 'firebase/app'

initFirebase()

const Delete = (props) => {
  const _refreshPage = () => {
    window.location.reload()
  }
  
  async function onSubmit(event) {
    event.preventDefault()
    const deleteRef = firebase.storage().ref(props.file)
    await deleteRef.delete().then(res => {
      _refreshPage()
      console.log('delete responce: ', res)
    })
    .catch(error => {
      console.error('failed to delete', error);
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <button className="siimple-btn siimple-btn--error" type="submit">削除</button>
    </form>
  )
}

export default Delete
