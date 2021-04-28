import firebase from 'firebase/app'
import { confirmAlert } from 'react-confirm-alert'; // Import


const Delete = (props) => {
  const _refreshPage = () => {
    window.location.reload()
  }

  const _deleteFile = async () => {
    const deleteRef = firebase.storage().ref(props.file)
    await deleteRef.delete().then(res => {
      _refreshPage()
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
          onClick: () => _deleteFile()
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
      <button className="siimple-btn siimple-btn--error" type="submit">削除</button>
    </form>
  )
}

export default Delete
