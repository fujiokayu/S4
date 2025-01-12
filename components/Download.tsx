import Axios from 'axios'
import fileDownload from 'js-file-download'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { firebaseApp } from '../utils/firebase/initFirebase'

interface DownloadProps {
  file: string
}

const Download = (props: DownloadProps) => {
  const storage = getStorage(firebaseApp)
  async function onSubmit(event) {
    try {
      event.preventDefault()
      const pathReference = ref(storage, props.file);
      const url = await getDownloadURL(pathReference)
      console.log(url)

      const response = await Axios.get(url, {
        method: 'GET',
        responseType: 'arraybuffer',
      })

      const data = await response.data
      fileDownload(data, props.file.substring(props.file.indexOf('/')+1));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('ファイルのダウンロードに失敗しました');
      }
    }
  }

  return (
    <form onSubmit={onSubmit} >
      <button className='downloadButton' type='submit'></button>
    </form>
  )
}

export default Download
