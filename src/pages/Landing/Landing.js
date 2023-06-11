import React from 'react'
import { NavLink } from 'react-router-dom'
import imgLanding from '../../assets/sushiLandingPage.jpeg'
import './landing.css'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

const Home = () => {
  return (
    <>
      <main>
        <section className='custom-container d-flex'>
          <article className='custom-hero-text'>
            <h2>Descubre sabores tradicionales</h2>
            <p>
              Sushi, sashimi, wok, ramen, gyoza, sopa pho, bibimbap, etc... Una variedad de <b>nuevos sabores</b> te esperan. ¿Te los vas a perder?
            </p>
            <NavLink className='custom-button link-custom' exact to={'/login'}>¡Pedir ya!</NavLink>
          </article>
          <img className='img-custom-size' src={imgLanding} alt='Sushi' />
        </section>
      </main>
      <RegisterForm />
    </>
  )
}

export default Home