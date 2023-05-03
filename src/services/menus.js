const basePath = 'http://localhost:8000/api/menues'

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
