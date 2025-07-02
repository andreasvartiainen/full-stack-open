import type { Props } from "../App";

const Hello = ({name, age}: Props) => {
	const bornYear = () => new Date().getFullYear() - age;
	return (
		<div>
		 <p>Hello {name}, you are {age} years old</p>
		 <p>So you were propably born in {bornYear()}</p>
		</div>
	)
}

export default Hello;
