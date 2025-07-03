import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

	const handleChange = (event) => {
		console.log(newName);
		setNewName(event.target.value);
	}

	const addPerson = (event) => {
		event.preventDefault();

		// check if the name already exists empty the string and return
		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to the phonebook`);
			setNewName('');
			return;
		}

		const newPerson = {
			name: newName,
		};

		setPersons([...persons, newPerson]);
		setNewName('');
	}

	const listPersons = persons.map((person) => <div key={person.name}>{person.name}</div> )

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
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
