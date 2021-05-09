import Download from '../components/Download'
import Delete from '../components/Delete'
import { uidContext } from '../pages/index';
import { format, add } from 'date-fns'
import { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app'
import { listAll } from '../utils/storage/storageUtil'

interface IFiles {
	name: string,
	contentType: string,
	size: number,
	updated: Date,
	md5Hash: string,
	fullPath: string
}

const List = (props) => {
  const [files, setFiles] = useState<IFiles[]>([])
  const [loaded, setLoaded] = useState(false)
  const [update, setUpdate] = useState(false)

  //子コンポーネントからの更新要求
  const changeState = (isState) => {
    setUpdate(isState)
  }

  const uid = useContext(uidContext)
  useEffect(() => {
    setLoaded(false)
    setUpdate(false)
    props.updateList(false)
    const f = async () => {
      if (!uid) {
        return 
      }

      const result = await listAll(uid)  
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
          alert('getMetadata error: ' + error.message)
        })
      }))
      setLoaded(true)
    }
    f()
  }, [uid, update, props.uploaded])

  if (!loaded) {
    return (
      <>
        <br />
        <div className="siimple-spinner siimple-spinner--primary"></div>
        <br />
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
            <li key={file.md5Hash}>ファイル更新日：{format(new Date(file.updated), 'yyyy/MM/dd HH:mm:ss')}</li>
            <li key={file.fullPath}>有効期限　　　：{format(add(new Date(file.updated), {days: 7}), 'yyyy/MM/dd HH:mm:ss')}</li>
            <Download file={file.fullPath}/>
            <Delete file={file.fullPath} changeState={changeState}/>
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
