import Download from '../components/Download'
import Delete from '../components/Delete'
import { uidContext } from '../pages/index';
import { format } from 'date-fns'
import { useState, useEffect, useContext } from 'react';
import initFirebase from '../utils/firebase/initFirebase'
import firebase from 'firebase/app'

initFirebase()

const List = (props) => {
  const [files, setFiles] = useState(null)
  const uid = useContext(uidContext)
  useEffect(() => {
    const f = async () => {
      console.log('list effect ', uid)

      if (uid) {
        console.log('list component uid: ', uid)

        const listRef = firebase.storage().ref(uid)
        const result = await listRef.listAll()
        .catch(function(error) {
          console.log(error)
        })
  
        if (result) {
          setFiles(result.items)
        }
      }
    }
    f();
  }, [uid])

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
