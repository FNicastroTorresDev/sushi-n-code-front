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