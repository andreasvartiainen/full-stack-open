import Input from "./input";

const PersonForm = ({newName, newPhone, handleChange ,addPerson}) => {
	return (
		<form>
			<Input name="name" text="name" value={newName} onChange={handleChange}/>
			<Input name="phone" text="number" value={newPhone} onChange={handleChange}/>
			<div>
				<button type="submit" onClick={addPerson}>add</button>
			</div>
		</form>
	)
}

export default PersonForm;
