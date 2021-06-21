import { useEffect, useState } from "react"

// 不改变传入对象
export const isFalsy = (value) => value === 0 ? false : !value
export const cleanObject = (object) => {
  const result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay) =>{
  const [debounce, setDebounce] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [delay, value])
  return debounce
}