import Note from "./components/note";

const Example = (props) => {
	console.log("props: ", props);
}

function App({ notes }) {

	const noteList = notes.map(note => <Note note={note}/>);

  return (
		<>
		<h1>Notes</h1>
		<ul>
		 {noteList}
		</ul>
		</>
  )
}

export default App
