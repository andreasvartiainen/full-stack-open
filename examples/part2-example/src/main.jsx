import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const notes = [
	{ id: 1, name: "first", content: "first content", important: true},
	{ id: 2, name: "second", content: "second content", important: true},
	{ id: 3, name: "third", content: "third content", important: true }
];

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
