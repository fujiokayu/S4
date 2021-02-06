import {useDropzone} from 'react-dropzone';
import {useState, useCallback} from 'react';

function _refreshPage() {
  window.location.reload()
}

const Upload = (props) => {
  const [files, setFiles] = useState([])

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

    if (!blob) {
      return
    }
    const arrayBuffer = await blob.arrayBuffer()
    const base64String = new Uint8Array(arrayBuffer).reduce(function (data, byte) {
      return data + String.fromCharCode(byte)
    }, '')
  
    console.log('blob: ',blob)
    await fetch("/api/upload", {
      method: 'POST',
      headers: new Headers({ 
        //'Content-Type': 'application/octet-stream', 
        'token': props.user.token, 
        'name': blob.name}),
      credentials: 'same-origin',
      body: base64String
      // Todo: API resolved without sending a response for /api/upload, this may result in stalled requests.
    })
    .then(res => {
      _refreshPage()
      console.log('upload responce: ', res)
    })
    .catch(error => {
      console.error('failed to fetch upload', error);
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
