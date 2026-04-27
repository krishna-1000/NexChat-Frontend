import { useEffect, useState } from 'react'

import './App.css'
import LoginForm from './components/auth/LoginForm'
import SignUpForm from './components/auth/SignUpForm'
import SingUpPage from './pages/authPage/SignUpPage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './pages/authPage/LoginPage'
import HomePage from './pages/mainPages/HomePage'
import ChatPage from './pages/mainPages/ChatPage'
import Test from './components/main/Test'
import Temp from './components/main/Temp'
import Modal from './modal/Modal'
import SocketEventListener from './components/main/websocket/SocketEventListener'
import LogoutPage from './pages/authPage/LogoutPage'
import ProtectedRoute from './layout/ProtectedRoute'
import PublicRoute from './layout/PublicRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './api/axiosInstance'
import axios from 'axios'
import { setInitialLoading, setMaintenanceMode } from './features/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import SplashScreen from './components/main/SplashScreen/SplashScreen'
import MaintenancePage from './pages/MaintenancePage'

function App() {

  const { isMaintenance, initialLoading } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await axios.get('/actuator/health')
        dispatch(setMaintenanceMode(false))
      } catch (error) {
        if (!error.response) {
          dispatch(setMaintenanceMode(true))
        }
      } finally {
        setTimeout(() => {
          dispatch(setInitialLoading(false));
        }, 500);
    
      }
    }
    checkHealth();

    
  }, [dispatch])

  if (initialLoading) {
    return (<SplashScreen />)
  }
  if (isMaintenance) {
    return (
      <MaintenancePage/>
    );
  }


  return (<>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      theme="dark"
      
    />
    <Router>
      <Routes>

        <Route element={<ProtectedRoute />}>

          <Route path='/logout' element={<LogoutPage />}></Route>
          <Route path='/temp' element={<Test />}></Route>
          <Route path="/chat" element={<ChatPage />} />

        </Route>




        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SingUpPage />} />


        </Route>




      </Routes>
      <Modal />
    </Router>
  </>)
}

export default App
