import {
  Routes,
  Route,
  Link,
} from "react-router-dom"
import './App.css';
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList"

function App() {
  const baseUrl = "/notes/v1";

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href={`${baseUrl}/notes`} className="navbar-brand">Note-Taking Frontend</a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={`${baseUrl}/notes`} className="nav-link">Notes</Link>
          </li>
          <li className="nav-item">
            <Link to={`${baseUrl}/notes/create`} className="nav-link">Add Note</Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={`${baseUrl}/notes`} element={<NotesList/>}/>
          <Route exact path={`${baseUrl}/notes/create`} element={<AddNote/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;
