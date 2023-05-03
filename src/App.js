import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import { useState, useEffect } from 'react';
import { ProtectedRoute } from './components/ProtectedRoutes/ProtectedRoutes';
import Orders from './pages/Orders/Orders';

function App() {
  const [ token, setToken ] = useState(null)

  useEffect(() => {
    const newToken = localStorage.getItem('accessToken')
    setToken(newToken)
  }, [])

  // const token = localStorage.getItem('accessToken')

  return (
    <Routes>
      <Route index element={<Navigate to='/landing' />} />

      <Route path='/landing' element={ <Landing /> } />

      <Route path='/orders' element={ <Orders /> } />   

      <Route path='/login' element={ <Login /> } />

      <Route path='*' element={<h1>Error 404</h1>} />

      {/* <Route path='/' element={token? <Home /> : <Navigate from='/home' exact to='/landing'/>} />

      <Route path='/home' element={token? <Home /> : <Navigate from='/home' exact to='/login'/>} /> */}

      <Route element={<ProtectedRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
