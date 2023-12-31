import { useState } from 'react'

const Button = ({handleClick, title}) => {
  return (
    <button title={title} onClick={handleClick}>
      {title}
    </button>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        No feedback given yet
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good:" value={props.good} />
          <StatisticLine text="Neutral:" value={props.neutral}/>
          <StatisticLine text="Bad:" value={props.bad} />
          <StatisticLine text="All:" value={props.good + props.neutral + props.bad} />
          <StatisticLine text="Avg:" value={(props.good - props.bad ) / (props.all)} />
          <StatisticLine text="Positive:" value={props.good / (props.all)* 100 + '%' } />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text} 
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    console.log('succesfully logged + ', good)
    setGood(good + 1)
    setAll(all + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick = {handleGood} title = {'Good'}/>
      <Button handleClick = {handleNeutral} title = {'Neutral'}/>
      <Button handleClick = {handleBad} title = {'Bad'}/>      

      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App