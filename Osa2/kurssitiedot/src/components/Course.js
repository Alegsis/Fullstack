const Course = ({course}) => {
    return(
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )}
  const Header = ({ name }) => {
    return(
    <h2>{name}</h2>
    )}
  
    const Total = ({ parts }) => {
        const total = parts.reduce((sum, part) => {
            return sum + part.exercises
        }, 0)
    return(
    <>
      <strong>Total of {total} exercises</strong>
    </>
    )}
  
  const Part = ({ name, exercises }) => {
    return(
    <p>
      {name} {exercises}
    </p>
    )}
  
  const Content = ({ parts }) => {
    return(
    <>
    {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}   
    </>
    )}
export default Course