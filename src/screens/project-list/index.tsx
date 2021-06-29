import { SearchPanel } from "./search-panel"
import { List } from './list'
import { useEffect, useState } from "react"
import { cleanObject, useMount, useDebounce, useDocumentTitle } from "utils"
import { useAsync } from 'utils/use-async'
import { useHttp } from "utils/http"
import { Project } from 'screens/project-list/list'
import styled from "@emotion/styled"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"

// import * as qs from 'qs'

// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  useDocumentTitle('项目列表', false)
  const debounceParam = useDebounce(param, 2000)
  // const [list, setList] = useState([])

  // 抽离到projects.ts文件中了
  const { isLoading, error, data: list } = useProjects(debounceParam)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)
  
  // 抽离到 utils/users.ts
  const { data: users } = useUsers()
  // const [users, set Users] = useState([])
  // const client = useHttp()
  // useMount(() => {
  //   client('users').then(setUsers)
  //   // fetch(`${apiUrl}/users`).then(async(res) => {
  //   //   if (res.ok) {
  //   //     setUsers(await res.json())
  //   //   }
  //   // })
  // })
  return <Container>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {error ? '错误' : null}
    <List loading={isLoading} dataSource={list || []} users={users || []} />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem ;
`