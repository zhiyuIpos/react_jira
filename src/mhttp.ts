import * as qs from 'qs'

import * as auto from 'auth-provider'
import {useAuth} from 'context/auto-context'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?:string
  data?:object
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig}: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Context-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  if (config.method?.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  console.log(endpoint, "***endpoint", config)
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async res => {
    if (res.status === 401) {
      await auto.logout()
      window.location.reload()
      return Promise.reject({message: '请重新登录'})
    }
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  // [string, Config]
  // Parameters<typeof http> ts操作符
  // js typeof 在 runtime十运行
  // ts中的typeof 静态环境运行 ： typeof 变量 , 把类型取出来， [typeof 变量]函数类型
  // utility type用法：用泛型
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}