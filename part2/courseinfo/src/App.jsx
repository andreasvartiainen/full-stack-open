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

const Part = ({part}) => (<p> {part.name} {part.exercises} </p>);

const Total = ({course}) => {
	let total = 0;
	course.parts.forEach((part) => total += part.exercises);

	return(
		<p><b>Number of exercises {total}</b></p>
	)
}

const Course = ({course}) => {
	return (
		<>
		<Header course={course}/>
		<Content course={course}/>
		<Total course={course}/>
		</>
	)
}


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
			{
        name: 'Redux',
        exercises: 11,
      },

    ],
  }

  return <Course course={course}/>
}

export default App
