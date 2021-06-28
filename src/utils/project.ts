import { useAsync } from "./use-async"
import { Project } from "screens/project-list/list"
import { useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  // const { run, isLoading, error, data: list } = useAsync<Project[]>()
  const { run, ...result } = useAsync<Project[]>()
  useEffect(() => {
    // setIsLoading(true)
    // 1.0 client('projects', {data: cleanObject(debounceParam)}).then(setList)
    // .catch(error => {
    //   setList([])
    //   setError(error)
    // })
    // .finally(() => setIsLoading(false))
    // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => {
    //   if (res.ok) {
    //     setList(await res.json())
    //   }
    // })
    // 2.0
    run(client('projects', {data: cleanObject(param || {})}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]) // debounceParam
  return result
}