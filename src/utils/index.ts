import { useEffect, useState } from "react"

// 不改变传入对象
export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''
export const cleanObject = (object: {[key: string] : unknown}) => {
  const result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // TODO 依赖项里面加上callback会造成无限循环，这个和useCallback以及UseMemo有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounce, setDebounce] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [delay, value])
  return debounce
}

export const useArray = <T>(array:T[]) => {
  const [value, setValue] = useState(array)
  function add (newValue:T) {
    setValue([...value, newValue])
  }
  function removeIndex (index: number) {
    // const newValue = value.filter((v, i) => i !== index)
    // setValue(newValue)
    const copyValue = [...value]
    copyValue.splice(index, 1)
    setValue(copyValue)
  }
  function clear () {
    setValue([])
  }
  return {
    value,
    clear,
    removeIndex,
    add
  }
}