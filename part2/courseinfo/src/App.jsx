const Header = ({course}) => <h1>{course.name}</h1>

const Content = ({course}) =>  {

	// map all parts
	const partList = course.parts.map((part) => <Part key={part.name} part={part} />);

	return (
		<div>
		{partList}
		</div>
	)
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Course = ({course}) => {

	return (
		<>
		<Header course={course}/>
		<Content course={course}/>
		</>
	)
}

const Total = (props) => <p>Number of exercises {props.total}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return <Course course={course}/>
}

export default App
