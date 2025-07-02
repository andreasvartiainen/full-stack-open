import { useState } from "react";
import Button from "./button";
import History from "./history";

const FullCounter = () => {
	const [clicks, setClicks] = useState({left: 0, right: 0});
	const [allClicks, setAll] = useState<string[]>([]);
	const [total, setTotal] = useState<number>(0)

	const handleLeftClick = () => {
		setAll([...allClicks, "L"])
		const newClicks = { ...clicks, left: clicks.left + 1 };
		setClicks(newClicks);
		setTotal(newClicks.right + newClicks.left);
	}

	const handleRightClick= () => {
		setAll([...allClicks, "R"])
		const newClicks = { ...clicks, right: clicks.right + 1 };
		setClicks(newClicks);
		setTotal(newClicks.right + newClicks.left);
	}


	return (
		<div>
		{clicks.left}
			<Button text='Left' onClick={handleLeftClick} />
			<Button text='Right' onClick={handleRightClick} />
		{clicks.right}
			<History allClicks={allClicks}/>
			<p>total {total}</p>
		</div>
	)
}

export default FullCounter;
