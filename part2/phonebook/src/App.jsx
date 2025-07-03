import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '358 505 050'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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
		};

		setPersons([...persons, newPerson]);
		setNewName('');
		setNewPhone('');
	}

	const listPersons = persons.map((person) => <div key={person.name}>{person.name} {person.phone}</div> )

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
				<div>
          number: <input value={newPhone} onChange={handlePhone}/>
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
