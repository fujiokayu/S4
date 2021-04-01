import Loader from "react-loader-spinner"

const WatchLoader = () => {
  return (
    <Loader
      type="Watch"
      color="#00d5ff"
      height={75}
      width={75}
      timeout={3000} //3 secs
    />
  )
}

export default WatchLoader
