const Header = ({props}) => {
    console.log(props.course.name)
    return (
      <div>
        <h1>
          {props.course.name}
        </h1>
      </div>
    )
}
  
  const Part = ({props}) => {
    return (
      <div>
        <p>
          {props.parts.name}: {props.parts.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({props}) => {
    return (
      <div>
        {props.parts.map((part, index) => (
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
        <Header course={props.course} />
        {/*}
        <Content parts={props.course.parts} />
  
        <Total parts={props.course.parts} /> */}
      </div>
    )
  }

  export default Course