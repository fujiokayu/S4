import {useDropzone} from 'react-dropzone';
import {useState, useCallback, useContext} from 'react';
import { uidContext } from '../pages/index';
import firebase from 'firebase/app'
import Progress from '../components/Progress';

const _refreshPage = () => {
  window.location.reload()
}

const Upload = () => {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const uid = useContext(uidContext)

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

  async function onSubmit(event) {
    event.preventDefault()
    setProgress(0)

    const blob: File = acceptedFiles[0]
    const filePath = uid + '/' + acceptedFiles[0].name

    const storageRef = firebase.storage().ref()
    const uploadRef = storageRef.child(filePath)
    const uploadTask = uploadRef.put(blob)
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
      _refreshPage()
    })
  }

  return (
    <div>
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
        </form>
      )}
    </div>
  )
}

export default Upload
