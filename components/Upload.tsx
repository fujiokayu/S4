import useSWR from 'swr'

const Upload = (props) => {
  const uploader = (url, token, source, name) =>
  fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', token , source, name}),
    credentials: 'same-origin',
  }).then((res) => res.json())
  const { data, error } = useSWR(
    props ? ['/api/upload', props.user.token, props.file.source, props.file.name] : null,
    uploader
  )

  return (
    <div>
      {error && <div>Failed to upload files...</div>}
      {!error && <div>File upload succeed !</div>}
    </div>
  )
}

export default Upload
