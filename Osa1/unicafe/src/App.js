import { useState } from 'react'
const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
const StatisticLine = (props) => {
  return(
    <tbody>
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.merkki}</td>
    </tr>
    </tbody>
  )
}
const Statistics = (props) => {
  if(props.good != 0 ||props.neutral != 0||props.bad != 0) {
    return(
    <table>
    <StatisticLine text="good" value ={props.good} />
    <StatisticLine text="neutral" value ={props.neutral} />
    <StatisticLine text="bad" value ={props.bad} />
    <StatisticLine text="all" value ={props.good + props.neutral + props.bad} />
    <StatisticLine text="average" value ={average(props.allClicks).toFixed(2)} />
    <StatisticLine text="positive" value ={((props.good/(props.good + props.neutral + props.bad))*100).toFixed(2)} merkki="%"/>
    </table>
    )
  }
  return (
    <div>no feedback given</div>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const handleGood = () => {
    setAll(allClicks.concat(1))
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setAll(allClicks.concat(-1))
    setBad(bad + 1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/> 
    </div>
    
  )
}
export default App
