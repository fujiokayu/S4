import useSWR from 'swr'
import Download from '../components/Download'

const List = (props) => {
  const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

  const { data, error } = useSWR(
    props ? ['/api/listFile', props.user.token] : null,
    fetcher
  )

  return (
    <div>
      {error && <div>Failed to fetch files...</div>}
      {data && !error ? (
        <div className="siimple-list">
          <hr />
          {data.fileList.length > 0 ? (
            data.fileList.map((file) => (
              <li key={file.metadata.id.toString()}>
                {file.name.substring(file.name.indexOf('/')+1)}: {file.metadata.contentType} {Math.round(file.metadata.size / 1024 / 4 * 3)}kb
                updated: {file.metadata.updated}
                <Download token={props.user.token} file={file.name.substring(file.name.indexOf('/')+1)}/>
                <hr />
              </li>
            ))
          ) : (
            <p>no files</p>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default List
