import axios from 'axios'
const basePath = `${process.env.REACT_APP_BASE_PATH}/api/menues`

export const createMenu = async (data) => {
  const res = await fetch(`${basePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const newData = await res.json()

  return newData
}

export const allMenues = async (token) => {
  // const res = await fetch(`${basePath}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'accesstoken': `${token}`
  //   }
  // })

  // const data = await res.json()

  // return data

  const response = await axios.get(`${basePath}`, {
    headers: {
      'Content-Type': 'application/json',
      'accesstoken': `${token}`
    }
  })

  return response.data
}

export const deleteOneMenu = async (id) => {
  const res = await fetch(`${basePath}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const message = await res.json()

  return message
}

export const getOneMenu = async (id) => {
  const res = await fetch(`${basePath}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()

  return data
}

export const editOneMenu = async (data) => {
  const { _id, name, imgUrl, state, price, details } = data

  const response = await axios.patch(`${basePath}/${_id}`, {
    name,
    imgUrl,
    state,
    price,
    details
  }, {
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  return response.data
}