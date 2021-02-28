import Download from '../components/Download'
import Delete from '../components/Delete'
import { uidContext } from '../pages/index';
import { format } from 'date-fns'
import { useState, useEffect, useContext } from 'react';
import initFirebase from '../utils/firebase/initFirebase'
import firebase from 'firebase/app'

initFirebase()

const List = (props) => {
  const [files, setFiles] = useState([])
  const uid = useContext(uidContext)
  console.log(uid)
  useEffect(() => {
    const f = async () => {
      if (!uid) {
        return 
      }

      const listRef = firebase.storage().ref(uid)
      const result = await listRef.listAll()
      .catch(function(error) {
        alert('list file error: ' + error)
      })
  
      if (result) {
        let fileList = [...files]
        fileList = []
        result.items.forEach(element => {
          const fileRef = firebase.storage().ref(uid).child(element.name)
          fileRef.getMetadata().then(function(metadata) {
            const item = { 
              name: element.name,
              contentType: metadata.contentType,
              size: metadata.size,
              updated: metadata.updated,
              md5Hash: metadata.md5Hash,
              fullPath: metadata.fullPath}
            fileList.push(item)
          }).catch(function(error) {
            alert('getMetadata error: ' + error)
          })
        })
        console.log('set', fileList)
        setFiles(fileList)
      }
    }
    f();
  }, [uid])

  return (
    <div>
      {files ? (
        <div className="siimple-list">
          {files.length > 0 ? (
            files.map((file) => (
              <div>{file.name}
              <li key={file.md5Hash}>
                content type: {file.contentType}
                <li> size: {Math.round(file.size / 1024 * 10) / 10}kb</li>
                <li>last updated: {format(new Date(file.updated), 'yyyy/MM/dd HH:mm:ss')}</li>
                <Download token={props.user.token} file={file.fullPath}/>
                <Delete token={props.user.token} file={file.fullPath}/>
                <hr />
              </li>
              </div>
            ))
          ) : (
            <p>アップロードされたファイルはありません</p>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default List
