const Header = ({name}) => {
    return (
      <div>
        <h1>
          {name}
        </h1>
      </div>
    )
}
  
  const Part = ({parts}) => {
    return (
      <div>
        <p>
          {parts.name}: {parts.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part, index) => (
          <Part key={index} parts={part} />
        ))}
      </div>
    )
  }
  
  
  const Total = ({props}) => {
    return (
      <div>
        <p>
          Number of exercises: {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
        </p>
      </div>
    )
  }
  
  const Course = ({props}) => {
    console.log("testi toimiiks tää:", props)
    return (
      <div>
        <Header name={props.name} />

        <Content parts={props.parts} />
        {/*}  
        <Total parts={props.course.parts} /> */}
      </div>
    )
  }

  export default Course