import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

// export const useUrlQueryParam = (keys: string[]) => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   return [
//     keys.reduce((prev: {[p:string]: string}, key: string) => {
//       return {...prev, [key]: searchParams.get(key) || ''}
//     }, {} as {[key in string]: string}),
//     setSearchParams
//   ] as const
// }

// 传入什么类型，就返回什么类型
// export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   return [
//     useMemo(
//       () => keys.reduce((prev: { [key in K]: string }, key: K) => {
//         return {...prev, [key]: searchParams.get(key) || ''}
//       }, {} as { [key in K]: string }),
//       [searchParams]
//     ),
//     setSearchParams
//   ] as const
// }

// 完善一下
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(
      () => keys.reduce((prev: { [key in K]: string }, key: K) => {
        return {...prev, [key]: searchParams.get(key) || ''}
      }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{[key in K]: unknown}>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const
}