import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Nav from './components/Nav'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Nav/>}  />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
    </>
  )
}

export default App
