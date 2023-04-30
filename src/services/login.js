const basePath = 'http://localhost:8000'

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