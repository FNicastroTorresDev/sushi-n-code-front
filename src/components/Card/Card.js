import React from 'react'
import { NavLink } from 'react-router-dom'


const Card = ({id, title, image}) => {
  return (
    <div className='container-card p-5'>
      <div className="card" style={{ width: '18rem' }}>
        <img src={image} className="img-thumbnail h-100 w-100" alt={title}/>
        <div className="card-body">
        <h5 className='d-flex justify-content-center'>{title}</h5>
        <NavLink className="link-custom custom-button d-flex justify-content-center" exact to={`/orders/${id}`}>Ver más</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Card
