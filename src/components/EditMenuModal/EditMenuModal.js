import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { getOneMenu } from '../../services/menus';
import EditMenuForm from '../EditMenuForm/EditMenuForm';

const EditMenuModal = ({ show, handleClose, menuToEdit }) => {

  const handleCloseModal = () => {
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Menú</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body d-flex justify-content-center">
        {!menuToEdit
          ? <Spinner />
          : <EditMenuForm menuToEdit={menuToEdit} />}
      </Modal.Body>
      <Modal.Footer>
        <button className='custom-button-2' onClick={handleCloseModal} >
          Cancelar
        </button>
        <button type='submit' form='editMenuForm' className='custom-button'>
          {!menuToEdit
            ? <div className="spinner-border spinner-border-sm"></div>
            : 'Aceptar'}
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditMenuModal