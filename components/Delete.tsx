import { getStorage, ref, deleteObject } from 'firebase/storage'
import { confirmAlert } from 'react-confirm-alert'
import { firebaseApp } from '../utils/firebase/initFirebase'

interface DeleteProps {
  file: string
  changeState: (state: boolean) => void
}

const Delete = (props: DeleteProps) => {
  const storage = getStorage(firebaseApp)

  const deleteFile = async () => {
    const deleteRef = ref(storage, props.file)
    await deleteObject(deleteRef).then(() => {
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
