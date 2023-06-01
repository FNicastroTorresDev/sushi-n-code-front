import axios from 'axios'

const basePath = `${process.env.REACT_APP_BASE_PATH}/api/login`

export const login = async (data) => {
  const response = await fetch(`${basePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response.json()
}

export const validateToken = async (data) => {

  const response = await axios.post(`${basePath}/validate`, {}, {
    headers: {
      'Content-type': 'application/json',
      'accessToken': data
    }
  })

  return response
}

