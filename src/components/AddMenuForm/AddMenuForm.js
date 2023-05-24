import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createMenu } from '../../services/menus'
import Swal from 'sweetalert2'

const AddMenuForm = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const { register, handleSubmit, formState: { errors }} = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    const created = await createMenu(data)

    if (created.error) {
      Swal.fire({
        icon: 'error',
        title: `${created.error}`
      })
      return
    }

    Swal.fire({
      icon:'success',
      title: `${created.message}`
    }).then(() => {
      window.location.reload()
      setIsLoading(false)
    })
  }

  return (
    <div className="modal fade" id="addMenu-form" tabindex="-1" aria-labelledby="addMenu-formLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addMenu-formLabel">Crear Menú</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body d-flex justify-content-center">
            <form id='addMenuForm' className='w-75' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <label for='nameMenu' className='form-label'>Nombre:</label>
                <input id='nameMenu' type='text' className='form-control' maxLength='40' {...register('name', {
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
                {errors.name && <span className='error-message'>{errors.name.message}</span>}
              </div>

              <div className='mb-3'>
                <label for='imgUrlMenu' className='form-label'>URL de Imagen:</label>
                <input id='imgUrlMenu' type='url' className='form-control' {...register('imgUrl', {
                  required: {
                    value: true,
                    message: 'Complete este campo.'
                  }
                })}/>
                {errors.imgUrl && <span className='error-message'>{errors.imgUrl.message}</span>}
              </div>

              <div className='mb-3'>
                <label for='stateMenu' className='form-label'>Estado:</label>
                <select id='stateMenu' type='text' className='form-control' {...register('state')} >
                  <option value='Disponible'>Disponible</option>
                  <option value='No disponible'>No disponible</option>
                </select>
              </div>

              <div className='mb-3'>
                <label for='priceMenu' className='form-label'>Precio:</label>
                <div className='input-group'>
                  <span class="input-group-text">$</span>
                  <input id='priceMenu' type='number' className='form-control' {...register('price', { 
                    min: {
                      value: 100,
                      message: 'El precio debe ser mayor a 100.'
                    } 
                  })}/>
                </div>
                {errors.price && <span className='error-message'>{errors.price.message}</span>}
              </div>

              <div className='mb-3'>
                <label for='detailsMenu' className='form-label'>Detalles:</label>
                <textarea id='detailsMenu' type='text' className='form-control' maxLength='101' placeholder='Breve descripción de la preparación.' {...register('details', {
                  min: {
                    value: 10,
                    message: 'El detalle debe tener al menos 10 caracteres.'
                  },
                  max: {
                    value: 100,
                    message: 'El detalle debe tener menos de 100 caracteres.'
                  }
                })}/>
                {errors.details && <span className='error-message'>{errors.details.message}</span>}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="link-custom custom-button-2" data-bs-dismiss="modal" disabled={isLoading}>
              Cancelar
            </button>
            <button type="submit" className="link-custom custom-button" form='addMenuForm' disabled={isLoading}>
              {isLoading 
                ? <div className="spinner-border spinner-border-sm"></div>
                : 'Aceptar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMenuForm