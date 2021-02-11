import Axios from 'axios'
import fileDownload from 'js-file-download'

const Download = (props) => {
  async function onSubmit(event) {
    try {
      event.preventDefault()
      const response = await Axios.get("/api/download", {
        method: 'GET',
        headers: {
          'fileName': props.file.name
        },
        responseType: 'blob'
      })
      const data = await response.data
      console.log('data.length: ', data.byteLength)

      fileDownload(data, props.file.name.substring(props.file.name.indexOf('/')+1));
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
