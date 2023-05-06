import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import About from './components/About'
import TodoState from './Context/todos/TodoState'
import Todos from './components/Todos';
import SignUp from './components/SignUp'
import Login from './components/Login'

function App() {

  return (  
    <TodoState>
    <Router>
      <NavbarComponent/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/todos' element={<Todos/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
    </TodoState>
  )
}

export default App
