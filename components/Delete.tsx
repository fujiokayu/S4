
const Delete = (props) => {
  function _refreshPage() {
    window.location.reload()
  }
  
  async function onSubmit(event) {
    try {
      event.preventDefault()
      await fetch("/api/delete", {
        method: 'DELETE',
        headers: new Headers({ 
          'token': props.token, 
          'filename': props.file.name}),
        credentials: 'same-origin',
        // Todo: API resolved without sending a response for /api/upload, this may result in stalled requests.
      })
      .then(res => {
        _refreshPage()
        console.log('upload responce: ', res)
      })
      .catch(error => {
        console.error('failed to fetch upload', error);
      })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <button className="siimple-btn siimple-btn--warning" type="submit">delete</button>
    </form>
  )
}

export default Delete
