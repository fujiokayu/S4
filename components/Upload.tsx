import {useDropzone} from 'react-dropzone';
import {useState, useCallback, useContext} from 'react';
import { uidContext } from '../pages/index';
import initFirebase from '../utils/firebase/initFirebase'
import firebase from 'firebase/app'

initFirebase()

function _refreshPage() {
  window.location.reload()
}

const Upload = (props) => {
  const [files, setFiles] = useState([])
  const uid = useContext(uidContext)

  const onDrop = useCallback(acceptedFiles => {
    setFiles([...files, ...acceptedFiles])
  }, [files])

  const { getRootProps, acceptedFiles, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxFiles: 1
  })

  const removeFile = file => () => {
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
  }

  const removeAll = () => {
    setFiles([])
  }

  const uploadFiles = files.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes{" "}
      <button className="siimple-btn siimple-btn--error" onClick={removeFile(file)}>取り消す</button>
    </li>
  ))

  async function onSubmit(event) {
    event.preventDefault()
    const blob: File = acceptedFiles[0]
    const filePath = uid + '/' + acceptedFiles[0].name

    const storageRef = firebase.storage().ref()
    const uploadRef = storageRef.child(filePath)
    uploadRef.put(blob)
      .then(function(snapshot) {
        _refreshPage()
    })
    .catch(error => {
      alert(error)
      console.error('failed to upload', error);
    })
  }

  return (
    <div>
      <section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>アップロードするファイルをドラッグアンドドロップしてください</p>
          <input className="siimple-btn siimple-btn--success" type="button" value="ファイルダイアログを開く" style={{width : '100%'}}onClick={open} />
        </div>
        <aside>
          <ul>{uploadFiles}</ul>
        </aside>
      </section>
      {uploadFiles.length > 0 && (
        <form onSubmit={onSubmit}>
          <button className="siimple-btn siimple-btn--primary" type="submit">アップロードする</button>
        </form>
      )}
    </div>
  )
}

export default Upload
