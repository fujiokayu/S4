import firebase from 'firebase/app'
import { confirmAlert } from 'react-confirm-alert'


const Delete = (props) => {

  const deleteFile = async () => {
    const deleteRef = firebase.storage().ref(props.file)
    await deleteRef.delete().then(res => {
      props.changeState(true)
    })
    .catch(error => {
      alert('ファイル削除に失敗しました: ' + error.message)
    })
  }
  
  async function onSubmit(event) {
    event.preventDefault()
    confirmAlert({
      title: '「' + props.file.replace(/^.*[\\\/]/, '') + '」' + 'を削除しますか？',
      buttons: [
        {
          label: '削除します',
          onClick: () => deleteFile()
        },
        {
          label: 'キャンセル',
          // 何もしない
          onClick: () => void(0)
        }
      ]
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <button className='deleteButton' type='submit'></button>
    </form>
  )
}

export default Delete
