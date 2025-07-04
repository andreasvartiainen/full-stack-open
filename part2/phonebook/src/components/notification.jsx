const Notification = ({notification}) => {
	const spacerStyle = {
		height: '3rem',
	}
	if (notification === null) {
		return (<div style={spacerStyle}></div>)
	}

	switch (notification.type) {
		case "info": {
			return (
				<div className="notification info">
				{notification.message}
				</div>)
		}
		case "error": {
			return (
				<div className="notification error">
				{notification.message}
				</div>)
		}
	}
}

export default Notification;
