import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createMenu, getOneMenu } from '../../services/menus'
import Swal from 'sweetalert2'

const EditMenuForm = ({ idMenu }) => {
  const [ menuToEdit, setMenuToEdit ] = useState({})

  useEffect( () => {
    const getMenuToEdit = async () => {
      const menu = await getOneMenu(idMenu)
      setMenuToEdit(menu)
    }
    getMenuToEdit()
  }, [])

  const { name, imgUrl, state, price, details } = menuToEdit

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: name,
      imgUrl: imgUrl,
      state: state,
      price: price,
      details: details
    }
  })

  const onSubmit = data => {
    Swal.fire({
      icon: 'info',
      title: 'Sin funciones todavía. :/'
    })
  }

  return (
    <div className="modal fade" id="editMenu-form" tabindex="-1" aria-labelledby="editMenu-formLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editMenu-formLabel">Editar Menú</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body d-flex justify-content-center">
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
                })}/>
                {errors.name && <span className='error-message'>{errors.name.message}</span>}
              </div>

              <div className='mb-3'>
                <label for='imgUrlEditMenu' className='form-label'>URL de Imagen:</label>
                <input id='imgUrlEditMenu' type='url' className='form-control' {...register('imgUrl', {
                  required: {
                    value: true,
                    message: 'Complete este campo.'
                  }
                })}/>
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
                  })}/>
                </div>
                {errors.price && <span className='error-message'>{errors.price.message}</span>}
              </div>

              <div className='mb-3'>
                <label for='detailsEditMenu' className='form-label'>Detalles:</label>
                <textarea id='detailsEditMenu' type='text' className='form-control' maxLength='101' placeholder='Breve descripción de la preparación.' {...register('details', {
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
            <button type="button" className="link-custom custom-button-2" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" className="link-custom custom-button" form='editMenuForm'>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditMenuForm