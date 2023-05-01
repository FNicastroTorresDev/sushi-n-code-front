import React from 'react'
import './home.css'

const Card = (props) => {
  return (
    <div className='container-card p-5'>
      <div className="card" style={{ width: '18rem' }}>
        <img src={props.image} className=" h-100 w-100" alt={props.title}/>
        <div className="card-body">
        <h5 className='d-flex justify-content-center'>{props.title}</h5>
        <a href="#" className="btn btn-success d-flex justify-content-center">Ver menu</a>
        </div>
      </div>
    </div>
  )
}

export default Card
