import Input from "./input";

const PersonForm = ({newName, newNumber, handleChange ,addPerson}) => {
	return (
		<form>
			<Input name="name" text="name" value={newName} onChange={handleChange}/>
			<Input name="number" text="number" value={newNumber} onChange={handleChange}/>
			<div>
				<button type="submit" onClick={addPerson}>add</button>
			</div>
		</form>
	)
}

export default PersonForm;
