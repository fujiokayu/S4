import Axios from 'axios'
import fileDownload from 'js-file-download'
import firebase from 'firebase/app'

const Download = (props) => {
  async function onSubmit(event) {
    try {
      event.preventDefault()
      const pathReference = firebase.storage().ref(props.file);
      const url = await pathReference.getDownloadURL()
      console.log(url)

      const response = await Axios.get(url, {
        method: 'GET',
        responseType: 'arraybuffer',
      })

      const data = await response.data
      fileDownload(data, props.file.substring(props.file.indexOf('/')+1));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={onSubmit} >
      <button className="siimple--float-left siimple-btn siimple-btn--primary" type="submit">ダウンロード</button>
    </form>
  )
}

export default Download
