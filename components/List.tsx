import Download from '../components/Download'
import Delete from '../components/Delete'
import { uidContext } from '../pages/index';
import { format } from 'date-fns'
import { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app'

interface IFiles {
	name: string,
	contentType: string,
	size: number,
	updated: Date,
	md5Hash: string,
	fullPath: string
}

const List = () => {
  const [files, setFiles] = useState<IFiles[]>([])
  const [loaded, setLoaded] = useState(false)

  const uid = useContext(uidContext)
  useEffect(() => {
    setLoaded(false)
    const f = async () => {
      if (!uid) {
        return 
      }

      const listRef = firebase.storage().ref(uid)
      const result = await listRef.listAll()
      .catch(function(error) {
        alert('list file error: ' + error)
      })
  
      if (!result) {
        return
      }

      files.splice(0)
      await Promise.all(result.items.map(async element => {
        const fileRef = firebase.storage().ref(uid).child(element.name)
        await fileRef.getMetadata().then(function(metadata) {
          const item: IFiles = { 
            name: element.name,
            contentType: metadata.contentType,
            size: metadata.size,
            updated: metadata.updated,
            md5Hash: metadata.md5Hash,
            fullPath: metadata.fullPath}
            files.push(item)
        }).catch(function(error) {
          alert('getMetadata error: ' + error)
        })
      }))
      setLoaded(true)
    }
    f()
  }, [uid])

  if (!loaded) {
    return (
      <>
        <p className="siimple-tip siimple-tip--warning siimple-tip--exclamation">
        Loading files...</p>
      </>
    )
  }

  return (
    <div className="siimple-list">
      {files.length > 0 ? (
        files.map((file) => (
          <ul>
            <span>{file.name}</span> : {file.contentType}
            <li key={file.size}>ファイルサイズ：{Math.round(file.size / 1024 * 10) / 10}kb</li>
            <li key={file.fullPath}>ファイル更新日：{format(new Date(file.updated), 'yyyy/MM/dd HH:mm:ss')}</li>
            <Download file={file.fullPath}/>
            <Delete file={file.fullPath}/>
            <hr />
          </ul>
        ))
      ) : (
        <p>アップロードされたファイルはありません</p>
      )}
    </div>
  )
}

export default List
