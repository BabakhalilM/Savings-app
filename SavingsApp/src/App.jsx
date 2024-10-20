import { Route, Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Nav from './components/Nav'
import Home from './components/Home'
import { Box } from '@chakra-ui/react'
import BankDeatails from './components/BankDeatails'

function App() {

  return (
    <Box >
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<BankDeatails/>}/>
        </Routes>
      </Box>
  )
}

export default App
