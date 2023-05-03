import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

const Login = () => {
  return (
    <>
      <main className='custom-main d-flex justify-content-center align-items-center'>
        <LoginForm />
      </main>

      <RegisterForm />
    </>
  )
}

export default Login