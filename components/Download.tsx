import Axios from 'axios'
import fileDownload from 'js-file-download'

function _str2bytes (str: string) {
  var bytes = new Uint8Array(str.length);
  for (var i=0; i<str.length; i++) {
      bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

const Download = (props) => {
  async function onSubmit(event) {
    try {
      event.preventDefault()
      const response = await Axios.get("/api/download", {
        method: 'GET',
        headers: {
          'fileName': props.file.name
        }
      })
      const data = await response.data
      console.log('data.length: ', data.length)
      const blob = new Blob([_str2bytes(data)], {type: "application/octet-stream"});

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
