const basePath = 'https://sushi-n-code.onrender.com'

export const login = async (data) => {
  const response = await fetch(`${basePath}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response.json()
}

export const validateToken = async (data) => {
  return await fetch(`${basePath}/api/login/validate`, {
     method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accessToken': data
      }
  })
    .then(res => res.json())
    .catch(error => error.json())
}