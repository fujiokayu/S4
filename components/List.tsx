import DataTable from '../components/DataTable'
import { uidContext } from '../pages/index';
import { format, add } from 'date-fns'
import { useState, useEffect, useContext, useMemo } from 'react';
import firebase from 'firebase/app'
import { listAll } from '../utils/storage/storageUtil'

interface IFiles {
	name: string,
	contentType: string,
	size: string,
	filePath: string,
	updated: string,
	expireDate: string,
  user: string
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

      let newList = []
      await Promise.all(result.items.map(async element => {
        const fileRef = firebase.storage().ref(uid).child(element.name)
        await fileRef.getMetadata().then(function(metadata) {
          const item: IFiles = {
            name: element.name,
            contentType: metadata.contentType,
            size: Math.round(metadata.size / 1024 * 10) / 10 + 'kb',
            updated: format(new Date(metadata.updated), 'yyyy/MM/dd HH:mm'),
            expireDate: format(add(new Date(metadata.updated), {days: 7}), 'yyyy/MM/dd HH:mm'),
            user: metadata.customMetadata.createUser,
            filePath: metadata.fullPath
          }
          newList.push(item)
        }).catch(function(error) {
          alert('getMetadata error: ' + error.message)
        })
      }))
      setFiles(newList)
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
        <DataTable data={files} changeState={changeState}/>
      ) : (
        <p>アップロードされたファイルはありません</p>
      )}
    </div>
  )
}

export default List
