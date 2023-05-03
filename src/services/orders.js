const basePath = 'http://localhost:8000/api/orders'

export const allOrders = async (token) => {
  const res = await fetch(`${basePath}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'accesstoken': `${token}`
    }
  })

  const data = await res.json()

  return data
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
