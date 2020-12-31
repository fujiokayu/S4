import useSWR from 'swr'

const Upload = (props) => {
  const uploader = (url, token, source) =>
  fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', token , source}),
    credentials: 'same-origin',
  }).then((res) => res.json())
  const { data, error } = useSWR(
    props ? ['/api/upload', props.user.token, props.file] : null,
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
