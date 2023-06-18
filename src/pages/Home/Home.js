import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import { allMenues } from '../../services/menus'
import Spinner from '../../components/Spinner/Spinner'

const Home = () => {
  const [ allMenus, setAllMenus ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const accesToken = window.localStorage.getItem('accessToken')

  const menusToShow = async () => {
    const menus = await allMenues(accesToken)
    setAllMenus(menus.data)
    setIsLoading(false)
  }

  useEffect( () => {
    menusToShow()
  }, [])

  if (isLoading) return <Spinner/>

  return (
    <main className='custom-main m-3 p-3 d-flex flex-column align-items-center'>
      <h2>Probá nuestros menús!!</h2>

      <div className='d-flex justify-content-lg-evenly align-items-lg-center flex-wrap'>

        {allMenus.map( menu => (
          <Card id={menu._id} title={menu.name} image={menu.imgUrl} />
        ))}
      </div>
    </main>
  )
}

export default Home