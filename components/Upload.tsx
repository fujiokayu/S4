const Upload = (props) => {
  function onSubmit(event) {
    event.preventDefault()

    fetch("/api/upload", {
      method: 'POST',
      headers: new Headers({ 
        'Content-Type': 'multipart/form-data', 
        'token': props.user.token, 
        'name': props.file.name}),
      credentials: 'same-origin',
      body: JSON.stringify(props.file.source) 
      // Todo: API resolved without sending a response for /api/upload, this may result in stalled requests.
    }).then((res) => res.json())
    }

  return (
    <form onSubmit={onSubmit}>
      <input type="file"/>
      <button type="submit">upload</button>
    </form>
  )
}

export default Upload
