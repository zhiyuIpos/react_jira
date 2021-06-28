// 操作JWT 的 token firebase第三方auth服务，本文将不需要写
import { User } from 'screens/project-list/search-panel'

const apiUrl = process.env.REACT_APP_API_URL
const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}: {user: User}) => {
  window.localStorage.setItem(localStorageKey, user.token || '0')
  return user
}

export const login = (data: {username: string, password: string}) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    }
    return Promise.reject(await res.json())
  })
}

export const register = (data: {username: string, password: string}) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    }
    return Promise.reject(await res.json())
  })
}

export const logout = async() => window.localStorage.removeItem(localStorageKey)
