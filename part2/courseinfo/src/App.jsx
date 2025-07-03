const Header = ({course}) => <h1>{course.name}</h1>

const Content = ({course}) =>  {

	// map all parts
	const partList = course.parts.map((part) => <Part key={part.id} part={part} />);

	return (
		<div>
		{partList}
		</div>
	)
}

const Part = ({part}) => (<p> {part.name} {part.exercises} </p>);

const Total = ({parts}) => {

	// use reduce to get total exercises
	const total = parts.reduce((s, p) => s + p.exercises, 0)

	return(
		<p><b>Number of exercises {total}</b></p>
	)
}

const Course = ({courses}) => {
	const courseList = courses.map((course) => (
		<div key={course.id}>
		<Header course={course}/>
		<Content course={course}/>
		<Total parts={course.parts}/>
		</div>
	));

	return (
		<>
		{courseList}
		</>
	)
}


const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses}/>
}

export default App
