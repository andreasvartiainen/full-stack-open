import { useEffect, useState } from 'react'
import Input from './components/input'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import backend from './services/services'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

	// effect hook for fetching data from the json database
	useEffect(() => {
		backend
			.getAll('http://localhost:3001/persons')
			.then((persons) => {
				setPersons(persons);
			})
	}, [])

	const handleChange = (event) => {
		if (event.target.name === "name") {
			console.log(newName);
			setNewName(event.target.value);
		}

		if (event.target.name === "number") {
			console.log(newNumber);
			setNewNumber(event.target.value);
		}

		if (event.target.name === "filter") {
			setFilter(event.target.value);
		}
	}

	const addPerson = (event) => {
		event.preventDefault();

		// check if we have both fielsd
		if (newNumber === '' || newName === '') {
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
			number: newNumber,
		};

		
		backend
			.create(newPerson)
			.then((personReturn) => {
				setPersons([...persons, personReturn]);
				setNewName('');
				setNewNumber('');
			})
	}

  return (
    <div>
      <h2>Phonebook</h2>
			{/* I used Input instead of Filter as in the example, because the implementation like this is a bit clearer I think	 */}
      <Input name="filter" text="filter shown with" value={filter} onChange={handleChange}/>
      <h2>Add a new</h2>
			<PersonForm 
				newName={newName}
				newNumber={newNumber}
				handleChange={handleChange}
				addPerson={addPerson}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App
