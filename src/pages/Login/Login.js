import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

const Login = () => {
  return (
    <>
      <Navbar />

      <main className='custom-main d-flex justify-content-center align-items-center'>
        <LoginForm />
      </main>

      <Footer />
      <RegisterForm />
    </>
  )
}

export default Login