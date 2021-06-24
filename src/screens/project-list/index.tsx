import { SearchPanel } from "./search-panel"
import { List } from './list'
import { useEffect, useState } from "react"
import { cleanObject, useMount, useDebounce } from "utils"
import { useHttp } from "mhttp"
import styled from "@emotion/styled"

// import * as qs from 'qs'

// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const client = useHttp()
  const debounceParam = useDebounce(param, 2000)
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    client('projects', {data: cleanObject(debounceParam)}).then(setList)
    // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => {
    //   if (res.ok) {
    //     setList(await res.json())
    //   }
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam])
  useMount(() => {
    client('users').then(setUsers)
    // fetch(`${apiUrl}/users`).then(async(res) => {
    //   if (res.ok) {
    //     setUsers(await res.json())
    //   }
    // })
  })
  return <Container>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List list={list} users={users} />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem ;
`