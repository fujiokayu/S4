const Upload = (props) => {
  function onSubmit(event) {
    event.preventDefault()

    const file: File = props.file.file
    let reader = new FileReader;
    reader.readAsArrayBuffer(file);
  
    reader.onload = () => {
      console.log(reader.result)
      fetch("/api/upload", {
        method: 'POST',
        headers: new Headers({ 
          'Content-Type': 'application/octet-binary', 
          'token': props.user.token, 
          'name': props.file.name}),
        credentials: 'same-origin',
        body: reader.result
        // Todo: API resolved without sending a response for /api/upload, this may result in stalled requests.
      }).then((res) => res.json())      
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      })
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <button type="submit">upload</button>
    </form>
  )
}

export default Upload
