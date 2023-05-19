import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '../../services/users'
import Swal from 'sweetalert2'

const RegisterForm = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const created = await registerUser(data)
      Swal.fire({
        icon: 'success',
        title: `${created.message}`,
        timer: 5000,
        timerProgressBar: true
      }).then(() => {
        window.location.reload()
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${err.response.data.error}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal fade" id="register-form" tabindex="-1" aria-labelledby="register-formLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="register-formLabel">Registro</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body d-flex justify-content-center">
            <form id='registerForm' className='w-75' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <label for='fullnameRegisterRegister' className='form-label'>Nombre completo:</label>
                <input id='fullnameRegisterRegister' type='text' className='form-control' maxLength='40' {...register('fullname', {
                  required: {
                    value: true,
                    message: 'Complete este campo.'
                  },
                  minLength: {
                    value: 8,
                    message: 'El nombre debe tener al menos 8 caracteres.'
                  },
                  maxLength: {
                    value: 35,
                    message: 'El nombre debe tener menos de 35 caracteres.'
                  }
                })}/>
                {errors.fullname && <span className='error-message'>{errors.fullname.message}</span>}
              </div>

              <div className='mb-3'>
                <label for='emailRegister' className='form-label'>Correo electrónico:</label>
                <input id='emailRegister' type='email' className='form-control' maxLength='25' {...register('email', {
                  required: {
                    value: true,
                    message: 'Ingrese un email.'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Ingrese un email válido.'
                  }
                })}/>
                {errors.email && <span className='error-message'>{errors.email.message}</span>}
              </div>

              <div className='mb-3'>
                <label for='passwordRegister' className='form-label'>Contraseña:</label>
                <input id='passwordRegister' type='password' className='form-control' maxLength='25' {...register('password', {
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

              <div className='mb-3'>
                <label for='repeat-password' className='form-label'>Repita contraseña:</label>
                <input id='repeat-password' type='password' className='form-control' maxLength='25' {...register('repeatPassword', {
                  validate: value => value === watch('password')
                })}/>
                {errors.repeatPassword && <span className='error-message'>Las contraseñas no coinciden.</span>}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="link-custom custom-button-2" data-bs-dismiss="modal" disabled={isLoading}>
              Cancelar
            </button>
            <button type="submit" className="link-custom custom-button" form='registerForm' disabled={isLoading}>
              {isLoading
                ? <div className="spinner-border spinner-border-sm"></div>
                : '¡Registrarme!'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm