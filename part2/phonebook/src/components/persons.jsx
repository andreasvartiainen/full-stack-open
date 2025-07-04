const Persons = ({persons, filter, removePerson}) => {
	// filter for getting substring from an item
	const f = (person) => {
		// console.log(person.name.indexOf(filter));
		// put filter and name to lowercase
		return person.name.toLowerCase().indexOf(filter.toLowerCase()) != -1
	}

	// filter and add the items to the list use id as key
	const listPersons = persons.filter(f).map((person) => 
		<li key={person.id}>{person.name} {person.number}
		<button onClick={() => removePerson(person)}>Remove</button>
		</li> 
	)
	return (
		<ul>
		{listPersons}
		</ul>
	)
}

export default Persons;
