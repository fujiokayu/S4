import Download from '../components/Download'
import Delete from '../components/Delete'
import { format } from 'date-fns'
import { useState, useEffect } from 'react';
import initFirebase from '../utils/firebase/initFirebase'
import firebase from 'firebase/app'

initFirebase()

const List = (props) => {
  const [files, setFiles] = useState(null)

  useEffect(() => {
    const f = async () => {
      const listRef = firebase.storage().ref(props.user.id)
      const result = await listRef.listAll()
      .catch(function(error) {
        // Uh-oh, an error occurred!
        console.log(error)
      })
      // @ts-ignore
      setFiles(result.items)
      console.log(files)
    }
    f();
  }, [])

  return (
    <div>
      {files ? (
        <div className="siimple-list">
          <hr />
          {files.length > 0 ? (
            files.map((file) => (
              <li key={file.name}>
                {file.name}: 
                <Download token={props.user.token} file={file.fullPath}/>
                <Delete token={props.user.token} file={file.fullPath}/>
                <hr />
              </li>
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
