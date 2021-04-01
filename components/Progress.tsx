import { Line } from 'rc-progress'

const Progress = (props) => {
  return (
    <div style={{ margin: 10, width: 200 }}>
      <Line strokeWidth={6} percent={props.percent} />
    </div>
  )
}

export default Progress
