import React from 'react'
import './footer.css'
import logoFooter from '../../assets/logoFooter.png'

const Footer = () => {
  return (
    <footer className='custom-color-footer bottom-0 w-100 d-flex align-items-center justify-content-evenly'>
      <section className=''>
        <img className='logo-size' src={logoFooter} alt='Logo Sushi y Más' />
      </section>
      <section className=''>
        <p className='fs-5 custom-p my-2 text-center'>Sushi & Code - Comisión 26i</p>
        <p className='fs-5 custom-p my-2 text-center'>Rolling Code School 2023</p>
      </section>
    </footer>
  )
}

export default Footer