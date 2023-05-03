import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Card from '../../components/Card/Card'
import { allMenues } from '../../services/menus'

const Home = () => {
  const [ allMenus, setAllMenus ] = useState([])
  const accesToken = window.localStorage.getItem('accessToken')

  const menusToShow = async () => {
    const menus = await allMenues(accesToken)
    setAllMenus(menus.data)
  }

  useEffect( () => {
    menusToShow()
  }, [])

  return (
    <>
      <Navbar />

      <main className='d-flex justify-content-lg-evenly align-items-lg-center flex-wrap'>
        {allMenus.map( menu => (
          <Card id={menu._id} title={menu.name} image={menu.imgUrl} />
        ))}

        {/* <Card
        title='Menu General'
        image='https://img.freepik.com/foto-gratis/vista-lateral-mezclar-rollos-sushi-bandeja-jengibre-wasabi_141793-14242.jpg?w=996&t=st=1682980045~exp=1682980645~hmac=9d9dcbced00416be5b5226ebeaa3f6066ad1871f6738f774651efda967d4015a'
        />
        <Card
        title='Menu Infantil'
        image='https://wonder-day.com/wp-content/uploads/2022/05/wonder-day-sushi-easy-drawings-1.jpg'
        />
        <Card
        title='Menu Vegano'
        image='https://img.freepik.com/foto-gratis/palillos-rollo-sushi-filadelfia-fondo-negro-hecho-salmon_8353-6016.jpg?w=996&t=st=1682980124~exp=1682980724~hmac=eddf957e6cf91a4d99bd50d8f13656262d44d380cce4a365e1eb310409d51df7'
        /> */}
      </main>

      <Footer/>
    </>
  )
}

export default Home