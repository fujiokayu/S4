import { useDropzone } from 'react-dropzone'
import { useState, useCallback, useContext } from 'react'
import { uidContext } from '../pages/index'
import firebase from 'firebase/app'
import Progress from '../components/Progress'
import { fileExists } from '../utils/storage/storageUtil'
import { confirmAlert } from 'react-confirm-alert'

const Upload = (props) => {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const uid = useContext(uidContext)

  const metadata = {
    customMetadata: {
      'createUser': props.user,
    }
  }

  const onDrop = useCallback(acceptedFiles => {
    const newFiles = [...files]
    newFiles.splice(0)
    setFiles([...newFiles, ...acceptedFiles])
  }, [files])

  const { getRootProps, acceptedFiles, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1
  })

  const removeFile = file => () => {
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
  }

  const uploadFiles = files.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes{" "}
      <button className="siimple-btn siimple-btn--error" onClick={removeFile(file)}>取り消す</button>
      { progress > 0 &&
        <Progress percent={progress}/>
      }
    </li>
  ))

  async function uploadFile() {
    setProgress(0)

    const blob: File = acceptedFiles[0]
    const filePath = uid + '/' + acceptedFiles[0].name

    const storageRef = firebase.storage().ref()
    const uploadRef = storageRef.child(filePath)
    const uploadTask = uploadRef.put(blob, metadata)
    uploadTask.on('state_changed', function(snapshot){
      const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setProgress(percent)
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused')
          break
        case firebase.storage.TaskState.RUNNING: // or 'running'
          break
      }
    }, function(error) {
      alert('failed to upload: ' + error.message)
    }, function() {
      console.log('Upload is done')
      setFiles([])
      setProgress(0)
      props.updateList(true)
    })
  }

  async function onSubmit(event) {
    event.preventDefault()

    if (await fileExists(uid, acceptedFiles[0].name)) {
      confirmAlert({
        title: '「' + acceptedFiles[0].name + '」' + 'は既に存在します。上書きしますか？',
        buttons: [
          {
            label: '上書きします',
            onClick: () => uploadFile()
          },
          {
            label: 'キャンセル',
            // 何もしない
            onClick: () => void(0)
          }
        ]
      })
    }
    else {
      uploadFile()
    }
  }

  return (
    <div style={{textAlign: 'center'}}>
      <section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>ファイルをドロップしてアップロード
            <br />
            または、クリックしてファイルを選択してください
          </p>
        </div>
        <aside>
          <ul>{uploadFiles}</ul>
        </aside>
      </section>
      {uploadFiles.length > 0 && (
        <form onSubmit={onSubmit}>
          <button className="siimple-btn siimple-btn--primary" type="submit">アップロード</button>
          <p className="siimple-tip siimple-tip--warning siimple-tip--exclamation" style={{ width: '380px', display: 'flex', margin: 'auto', marginTop: '20px', backgroundColor: 'rgba(255, 239, 192, 1)' }}> 
            アップロードしたファイルは1週間後に削除されます </p>
        </form>
      )}
    </div>
  )
}

export default Upload
