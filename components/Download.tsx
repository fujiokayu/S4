import fileDownload from 'js-file-download'

const Download = (props) => {
  async function onSubmit(event) {
    try {
      event.preventDefault()
      const response = await fetch("/api/download", {
        method: 'GET',
        headers: new Headers({ 
          'fileName': props.file.name}),
        credentials: 'same-origin',
        // Todo: API resolved without sending a response for /api/upload, this may result in stalled requests.
      })
      const base64String = await response.text()
      const decodeString = atob(base64String)
      let array = new Uint8Array(decodeString.length);
      for (let i = 0; i < decodeString.length; i++){
          array[i] = decodeString.charCodeAt(i);
      }
      const blob = new Blob([array], {type: 'application/octet-stream'});

      fileDownload(blob, props.file.name.substring(props.file.name.indexOf('/')+1));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={onSubmit} >
      <button className="siimple--float-left siimple-btn siimple-btn--light" type="submit">download</button>
    </form>
  )
}

export default Download
