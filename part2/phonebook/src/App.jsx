import { useState } from 'react'
import Input from './components/input'
import PersonForm from './components/personForm'
import Persons from './components/persons'

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

	const handleChange = (event) => {
		if (event.target.name === "name") {
			console.log(newName);
			setNewName(event.target.value);
		}

		if (event.target.name === "phone") {
			console.log(newPhone);
			setNewPhone(event.target.value);
		}

		if (event.target.name === "filter") {
			setFilter(event.target.value);
		}
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

  return (
    <div>
      <h2>Phonebook</h2>
			{/* I used Input instead of Filter as in the example, because the implementation like this is a bit clearer I think	 */}
      <Input name="filter" text="filter shown with" value={filter} onChange={handleChange}/>
      <h2>Add a new</h2>
			<PersonForm 
				newName={newName}
				newPhone={newPhone}
				handleChange={handleChange}
				addPerson={addPerson}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App
