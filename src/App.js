import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { useState, useEffect } from 'react';

function App() {
  const [ token, setToken ] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setToken(token)
  }, [])

  // const token = localStorage.getItem('accessToken')

  return (
    <Routes>
      <Route index element={<Navigate to='/landing' />} />

      <Route path='/landing' element={ <Landing /> } />   

      <Route path='/login' element={ <Login /> } />

      <Route path='/' element={token? <Home /> : <Navigate from='/home' exact to='/landing'/>} />

      <Route path='/home' element={token? <Home /> : <Navigate from='/home' exact to='/login'/>} />
    </Routes>
  );
}

export default App;
