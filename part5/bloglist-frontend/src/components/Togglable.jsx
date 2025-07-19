import { useImperativeHandle } from "react";
import { forwardRef, useState } from "react";

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false);

	const showNotVisible = {display: `${visible ? 'none' : ''}`};
	const showWhenVisible = {display: `${visible ? '' : 'none'}`};

	const toggleVisibility = () => {
		setVisible(!visible);
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility
		}
	})
	
	return (
		<>
		<div style={showNotVisible}>
		<button onClick={() => setVisible(true)}>{props.buttonLabel}</button>
		</div>
		<div style={showWhenVisible}>
		{ props.children }
		<button onClick={() => setVisible(false)}>cancel</button>
		</div>
		</>
	)
})

Togglable.displayName = "Togglable";

export default Togglable;
