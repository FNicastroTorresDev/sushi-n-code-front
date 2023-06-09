import axios from 'axios'

const basePath = `${process.env.REACT_APP_BASE_PATH}/api/orders`

export const allOrders = async (token) => {
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

export const createOrder = async (data) => {
  const res = await fetch(`${basePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  const created = await res.json()

  if (created.message) {
    return true
  }

  return false
}

export const changeToDelivered = async (id) => {
  await fetch(`${basePath}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      state: 'Realizado'
    })
  })
} 
