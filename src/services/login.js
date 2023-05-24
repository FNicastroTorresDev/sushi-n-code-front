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
  return await fetch(`${basePath}/validate`, {
     method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accessToken': data
      }
  })
    .then(res => res.json())
    .catch(error => error.json())
}