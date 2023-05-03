const basePath = 'http://localhost:8000/api/users'

export const registerUser = async (data) => {
  return await fetch(`${basePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(error => error.json())
}

export const allUsers = async (token) => {
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

export const enableDisable = async (id, action, token) => {
  const stateToChange = action === 'Inhabilitar' ? 'Inactivo' : 'Activo'

  await fetch(`${basePath}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'accesstoken': `${token}`
    },
    body: JSON.stringify({
      state: stateToChange
    })
  })
}