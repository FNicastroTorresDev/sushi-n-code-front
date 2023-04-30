import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Login = () => {
  return (
    <>
      <Navbar />

      <main className='custom-main d-flex justify-content-center align-items-center'>
        <LoginForm />
      </main>

      <Footer />
    </>
  )
}

export default Login