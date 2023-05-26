import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import { ProtectedRoute } from './components/ProtectedRoutes/ProtectedRoutes';
import Orders from './pages/Orders/Orders';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route index element={<Navigate to='/landing' />} />
        <Route path='/landing' element={ <Landing /> } />  
        <Route path='/login' element={ <Login /> } />
        <Route path='*' element={<h1>Error 404</h1>} />

        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/orders/:id' element={<Orders />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
