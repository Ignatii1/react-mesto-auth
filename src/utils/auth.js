export const baseUrlAuth = 'https://auth.nomoreparties.co'

const checkRes = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const login = (email, password) => {
  return fetch(`${baseUrlAuth}/signin`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkRes)
}

export const register = (email, password) => {
  return fetch(`${baseUrlAuth}/signup`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkRes)
}

export const checkToken = (JWT) => {
  return fetch(`${baseUrlAuth}/users/me`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${JWT}`,
    },
  }).then(checkRes)
}
