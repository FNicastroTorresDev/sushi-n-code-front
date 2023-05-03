const basePath = 'https://sushi-n-code.onrender.com/api/orders'

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
