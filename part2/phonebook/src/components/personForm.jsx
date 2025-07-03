import Input from "./input";

const PersonForm = ({newName, newPhone, handleName, handlePhone, addPerson}) => {
	return (
		<form>
			<Input text="name" value={newName} onChange={handleName}/>
			<Input text="number" value={newPhone} onChange={handlePhone}/>
			<div>
				<button type="submit" onClick={addPerson}>add</button>
			</div>
		</form>
	)
}

export default PersonForm;
