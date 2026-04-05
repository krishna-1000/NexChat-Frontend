import { useState } from 'react'

import './App.css'
import LoginForm from './components/auth/LoginForm'
import SignUpForm from './components/auth/SignUpForm'
import SingUpPage from './pages/authPage/SignUpPage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './pages/authPage/LoginPage'
import HomePage from './pages/HomePage'
import ChatPage from './pages/mainPages/ChatPage'

function App() {

  return (<>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SingUpPage />}></Route>
        <Route path='/chat' element={<ChatPage />}></Route>
      </Routes>

    </Router>
  </>)
}

export default App
