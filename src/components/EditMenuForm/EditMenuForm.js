import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { editOneMenu } from '../../services/menus'

const EditMenuForm = ({ menuToEdit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: menuToEdit.menu
  })

  const onSubmit = data => {
    Swal.fire({
      icon: 'question',
      title: `¿Está seguro?`,
      text: 'Esta acción no se puede deshacer.',
      confirmButtonText: `Sí`,
      showCancelButton: true,
      cancelButtonText: `Cancelar`,
    }).then( async result => {
      if (result.isConfirmed) {
        try {
          const edited = await editOneMenu(data)
          Swal.fire({
            icon:'success',
            title: `${edited.message}`,
            showConfirmButton: false,
            timer: 1500
          }).then( () => window.location.reload())
        } catch (err) {
            Swal.fire({
            icon: 'error',
            title: `${err.response.data.error}`,
          })
        }
      }
    })
  }

  return (
    <form id='editMenuForm' className='w-75' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-3'>
        <label for='nameEditMenu' className='form-label'>Nombre:</label>
        <input id='nameEditMenu' type='text' className='form-control' maxLength='40' {...register('name', {
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
        })} />
        {errors.name && <span className='error-message'>{errors.name.message}</span>}
      </div>

      <div className='mb-3'>
        <label for='imgUrlEditMenu' className='form-label'>URL de Imagen:</label>
        <input id='imgUrlEditMenu' type='url' className='form-control' {...register('imgUrl', {
          required: {
            value: true,
            message: 'Complete este campo.'
          }
        })} />
        {errors.imgUrl && <span className='error-message'>{errors.imgUrl.message}</span>}
      </div>

      <div className='mb-3'>
        <label for='stateEditMenu' className='form-label'>Estado:</label>
        <select id='stateEditMenu' type='text' className='form-control' {...register('state')} >
          <option value='Disponible'>Disponible</option>
          <option value='No disponible'>No disponible</option>
        </select>
      </div>

      <div className='mb-3'>
        <label for='priceEditMenu' className='form-label'>Precio:</label>
        <div className='input-group'>
          <span class="input-group-text">$</span>
          <input id='priceEditMenu' type='number' className='form-control' {...register('price', { 
            min: {
              value: 100,
              message: 'El precio debe ser mayor a 100.'
            } 
          })} />
        </div>
        {errors.price && <span className='error-message'>{errors.price.message}</span>}
      </div>

      <div className='mb-3'>
        <label for='detailsEditMenu' className='form-label'>Detalles:</label>
        <textarea id='detailsEditMenu' type='text' className='form-control' maxLength='101' {...register('details', {
          min: {
            value: 10,
            message: 'El detalle debe tener al menos 10 caracteres.'
          },
          max: {
            value: 100,
            message: 'El detalle debe tener menos de 100 caracteres.'
          }
        })} />
        {errors.details && <span className='error-message'>{errors.details.message}</span>}
      </div>
    </form>
  )
}

export default EditMenuForm