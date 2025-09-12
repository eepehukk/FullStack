const Header = (props) => {
  console.log(props.course.name)
  return (
    <div>
      <h1>
        {props.course.name}
      </h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.parts.name}: {props.parts.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts[0]}/>
      <Part parts={props.parts[1]}/>
      <Part parts={props.parts[2]}/>     
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </div>
  )
}

const Course = (props) => {
  console.log('Testi1', props.course.name)
  return (
    <div>
      <Header course={props.course} />
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App