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
		<p><b>Total of exercises {total}</b></p>
	)
}

const Courses = ({courses}) => {
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

export default Courses;
