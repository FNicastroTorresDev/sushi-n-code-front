import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/logo.png'
import logoText from '../../assets/logoText.png'
import TotalItems from "../CartContent/TotalItems";
import { useContext } from "react";
import { dataContext } from "../../Context/DataContext";
import jwt from 'jwt-decode'

const Navbar = () => {
  const token = window.localStorage.getItem('accessToken')
  const location = useLocation()
  const [ isAdmin, setIsAdmin ] = useState(false)

  useEffect( () => {
    var role

    if (token) {
      role = jwt(token)
    }

    if ( role?.role === 'admin' ) {
      setIsAdmin(true)
    }
  }, [])

  const closeSession = () => {
    localStorage.clear()
    window.location.replace('/landing')
  }
  const { cart } = useContext(dataContext);

  return (
    <nav class="navbar navbar-expand-lg nav-custom-color d-flex naavbar">
      <div className="container-fluid diiv1">
        <section className='section1'>
          <NavLink className="navbar-brand d-flex align-items-center" exact to={'/home'}>
            <img src={logo} alt='Logo de Sushi & Más' />
            <img className='logoText-size' src={logoText} alt='Texto del logo' />
          </NavLink>
        </section>
        <section>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-custom-color" id="navbarNavAltMarkup">
            {location.pathname !== '/landing' && location.pathname !== '/login'
              ? <div className="navbar-nav d-flex">
                  {isAdmin && <NavLink className="dropdown-item mx-2 link-custom text-custom-color" exact to={'/admin'}>Administración</NavLink>}
                  <button className="dropdown-item mx-2 link-custom text-custom-color" onClick={closeSession}>Cerrar sesión</button>             
                  <NavLink to={"/cart"} className='d-flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart3 text-white" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    {cart.length > 0 ? <TotalItems /> : null}
                  </NavLink>
                </div>
              : <div className="navbar-nav d-flex">
                  <NavLink className="dropdown-item mx-2 link-custom text-custom-color" exact to={'/login'}>Ingresar</NavLink>
                  <button className="dropdown-item mx-2 link-custom text-custom-color" data-bs-toggle="modal" data-bs-target="#register-form">Registrarme</button>
                </div>}
          </div>
        </section>
      </div>
    </nav>
  )
}

export default Navbar