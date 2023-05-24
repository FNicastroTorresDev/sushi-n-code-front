import axios from 'axios'
const basePath = `${process.env.REACT_APP_BASE_PATH}/api/users`

// export const registerUser = async (data) => {
//   return await fetch(`${basePath}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(res => res.json())
//     .catch(error => error.json())
// }

export const registerUser = async data => {
  const { fullname, email, password } = data

  const response = await axios.post(`${basePath}`, {
    fullname, 
    email, 
    password
  }, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  
  return response.data
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