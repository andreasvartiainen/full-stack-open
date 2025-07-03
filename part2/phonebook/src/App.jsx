import { useState } from 'react'

const Input = ({text, value, onChange}) => {
	return (
		<div>
			{text}: <input value={value} onChange={onChange}/>
		</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '358 505 050', id: 0},
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

	const handleName = (event) => {
		console.log(newName);
		setNewName(event.target.value);
	}

	const handlePhone = (event) => {
		console.log(newPhone);
		setNewPhone(event.target.value);
	}

	const addPerson = (event) => {
		event.preventDefault();

		// check if we have both fielsd
		if (newPhone === '' || newName === '') {
			alert(`Missing a phone number or name`);
			return;
		}

		// check if the name already exists empty the string and return
		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to the phonebook`);
			setNewName('');
			return;
		}

		const newPerson = {
			name: newName,
			phone: newPhone,
			id: persons.length + 1
		};

		setPersons([...persons, newPerson]);
		setNewName('');
		setNewPhone('');
	}

	const handleFilter = (event) => {
		setFilter(event.target.value);
	}

	// filter for getting substring from an item
	const f = (person) => {
		console.log(person.name.indexOf(filter));
		// put filter and name to lowercase
		return person.name.toLowerCase().indexOf(filter.toLowerCase()) != -1
	}

	// filter and add the items to the list use id as key
	const listPersons = persons.filter(f).map((person) => 
		<div key={person.id}>{person.name} {person.phone}</div> 
	)

  return (
    <div>
      <h2>Phonebook</h2>
      <Input text="filter shown with" value={filter} onChange={handleFilter}/>
      <h2>Add a new</h2>
      <form>
        <Input text="name" value={newName} onChange={handleName}/>
				<Input text="number" value={newPhone} onChange={handlePhone}/>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
			{listPersons}
    </div>
  )
}

export default App
