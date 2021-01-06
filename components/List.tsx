import useSWR from 'swr'

const List = (props) => {
  const fetcher = (url, token, id) =>
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
        <div>
          {data.fileList.length > 0 ? (
            data.fileList.map((file) => (
              //Todo: it's not unique key
              <ul><li key={file.name}>{file.name}</li></ul>
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
