import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/logo.png'
import logoText from '../../assets/logoText.png'

const Navbar = () => {
  const location = useLocation()

  const closeSession = () => {
    localStorage.clear()
    window.location.replace('/landing')
  }

  return (
    <nav class="navbar navbar-expand-lg nav-custom-color d-flex naavbar">
      <div className="container-fluid d-flex justify-content-lg-between">
        <section>
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
            {
              location.pathname !== '/landing' && location.pathname !== '/login'
                ? <div className="navbar-nav d-flex">
                    <NavLink className="dropdown-item mx-2 link-custom text-custom-color" exact to={'/admin'}>Administración</NavLink>
                    <button className="dropdown-item mx-2 link-custom text-custom-color" onClick={closeSession}>Cerrar sesión</button>
                  </div>
                : <div className="navbar-nav d-flex">
                    <NavLink className="dropdown-item mx-2 link-custom text-custom-color" exact to={'/login'}>Ingresar</NavLink>
                    <button className="dropdown-item mx-2 link-custom text-custom-color" data-bs-toggle="modal" data-bs-target="#register-form">Registrarme</button>
                  </div>
            }
          </div>
        </section>
      </div>
    </nav>
  )
}

export default Navbar