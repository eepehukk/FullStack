const Header = ({name}) => {
    return (
      <div>
        <h2>
          {name}
        </h2>
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
  
  
  const Total = ({parts}) => {
    return (
      <div>
        <p>
          <b>Number of exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)}</b>
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

        <Total parts={props.parts} />
      </div>
    )
  }

  export default Course