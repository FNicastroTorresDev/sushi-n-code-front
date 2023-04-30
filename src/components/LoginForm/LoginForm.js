import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './loginForm.css'
import { login } from '../../services/login'

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [ wrongCredentials, setWrongCredentials ] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const { message, accessToken } = await login(data)

    if (!accessToken) {
      setWrongCredentials(message)
      setTimeout( () => setWrongCredentials(''), 5000)
      return
    }

    window.localStorage.setItem('accessToken', accessToken)
    navigate('/home')
  }

  return (
    <section className='custom-form-container'>
      <h2 className='text-center mb-2'>Iniciar sesión</h2>

      {wrongCredentials? <span className='custom-error-message'>{wrongCredentials}</span> : ''}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label for='email' className='form-label'>Correo electrónico</label>
          <input id='email' className='form-control' {...register(
            'email', {
              required: {
                value: true,
                message: 'Ingrese un email.'
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Ingrese un email válido.'
              }
            })} />
            {errors.email && <span className='error-message'>{errors.email.message}</span>}
        </div>
    
        <div className='mb-3'>
          <label for='password' className='form-label'>Contraseña</label>
          <input id='password' type='password' className='form-control' {...register(
            'password', {
            required: {
              value: true,
              message: 'Ingrese una contraseña.'
            },
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres.'
            },
            maxLength: {
              value: 20,
              message: 'La contraseña debe tener menos de 20 caracteres.'
            }
            })}/>
          {errors.password && <span className='error-message'>{errors.password.message}</span>}
        </div>

        <button type='submit' className='custom-button'>Ingresar</button>
      </form>
    </section>
  )
}

export default LoginForm