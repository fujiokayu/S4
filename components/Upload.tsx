const Upload = (props) => {

  async function onSubmit(event) {
    event.preventDefault()

    const blob: File = props.file.file
    const arrayBuffer = await blob.arrayBuffer();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    console.log('base64String: ', base64String)
    fetch("/api/upload", {
      method: 'POST',
      headers: new Headers({ 
        //'Content-Type': 'application/octet-stream', 
        'token': props.user.token, 
        'name': props.file.name}),
      credentials: 'same-origin',
      body: base64String
      // Todo: API resolved without sending a response for /api/upload, this may result in stalled requests.
    }).then((res) => res.json())      
    .then(data => {
      console.log('fetch result: ', data);
    })
    .catch(error => {
      console.error(error);
    })
  }
  return (
    <form onSubmit={onSubmit}>
      <button type="submit">upload</button>
    </form>
  )
}

export default Upload
