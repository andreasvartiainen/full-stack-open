import { useEffect, useState } from 'react'
import Input from './components/input'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import backend from './services/services'

import './app.css'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

	// {message, type};
	const [notification, setNotification] = useState({message: 'test', type: 'info'});

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

	const startNotification = (message, type) => {
		const newNotification = {message, type};

		setNotification(newNotification);

		setTimeout(() => 
			setNotification(null)
			, 3000)
	}

	const addPerson = (event) => {
		event.preventDefault();

		// check if we have both fielsd
		if (newNumber === '' || newName === '') {
			alert(`Missing a phone number or name`);
			return;
		}

		const newObject = {
			name: newName,
			number: newNumber
		}

		// check if the name already exists empty the string and return
		const index = persons.find((person) => person.name === newName)
		console.log(index);
		if (index !== -1 && index !== undefined) {
			const isConfirm = window.confirm(`${newName} already added to the phone book, replace the old number with a new one?`)
			if (isConfirm) {
				backend
				.update(index.id, newObject)
				.then((response) => {
					setPersons(persons.map((person) => {
						return person.id === response.id ? {...person, number: response.number} : person
					}));
				startNotification(`Updated ${response.name}'s number`, 'info');
				});
			}

			setNewName('');
			setNewNumber('');
			return;
		}

		const newPerson = {
			name: newName,
			number: newNumber,
		};

		startNotification(`Added ${newPerson.name}`, 'info');
		
		backend
			.create(newPerson)
			.then((personReturn) => {
				setPersons([...persons, personReturn]);
				setNewName('');
				setNewNumber('');
			})
	}

	const removePerson = (person) => {
		const isConfirm = window.confirm(`Delete ${person.name}`)
		// delete entry if confirmation is true
		if (isConfirm) {
		backend
			.remove(person.id)
			.then((response) => {
				console.log(response)
				setPersons(persons.filter((p) => p.id !== person.id))
				startNotification(`Removed ${response.name}`, 'info');
			});
		}
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<Notification notification={notification} />
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
			<Persons persons={persons} filter={filter} removePerson={removePerson}/>
    </div>
  )
}

export default App
