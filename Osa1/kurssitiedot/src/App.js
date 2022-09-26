


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  const Header = (props) => {
    return(
    <div>
      <h1>{props.course}</h1>
    </div>
    )
}
const Part = (prop) => {
  return(
    <div>
      <p>{prop.part} {prop.exercise}</p>
    </div>
  )
}
const Content = () => {
  return(
  <div>
    <Part part={part1} exercise={exercises1}/>
    <Part part={part2} exercise={exercises2}/>
    <Part part={part3} exercise={exercises3}/>
  </div>
  )
}
const Total = (props) => {
  return(
  <div>
    Number of exercises {props.exercises + props.exercisesx + props.exercisesy}
  </div>
  )
}

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total exercises={exercises1} exercisesx={exercises2} exercisesy={exercises3}/>
    </div>
    
  )
}

export default App