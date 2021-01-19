import {useDropzone} from 'react-dropzone';
import React from 'react';

const Upload = (props) => {
  const {getRootProps, acceptedFiles, getInputProps, open} = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1
  })
  const files = acceptedFiles.map(file => <li key={(file as any).path}>{(file as any).path}</li>);
  console.log(files)
  async function onSubmit(event) {
    event.preventDefault()

    const blob: File = acceptedFiles[0]
    acceptedFiles[0] = null
    if (!blob) {
      return
    }
    const arrayBuffer = await blob.arrayBuffer()
    const base64String = new Uint8Array(arrayBuffer).reduce(function (data, byte) {
      return data + String.fromCharCode(byte)
    }, '')
  
    console.log('blob: ',blob)
    const response = await fetch("/api/upload", {
      method: 'POST',
      headers: new Headers({ 
        //'Content-Type': 'application/octet-stream', 
        'token': props.user.token, 
        'name': blob.name}),
      credentials: 'same-origin',
      body: base64String
      // Todo: API resolved without sending a response for /api/upload, this may result in stalled requests.
    }).catch(error => {
      console.error(error);
    })
    console.log('upload responce: ', response)
  }

  return (
    <div>
      <section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Drag and Drop file here</p>
          <button className="siimple-btn siimple-btn--success" type="button" onClick={open}>
            Open File Dialog
          </button>
        </div>
        <aside>
          <ul>{files}</ul>
        </aside>
      </section>
      {files.length > 0 && (
        <form onSubmit={onSubmit}>
          <button className="siimple-btn siimple-btn--primary" type="submit">upload</button>
        </form>
      )}
    </div>
  )
}

export default Upload
