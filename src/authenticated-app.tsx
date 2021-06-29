import React from 'react'

import { Row } from 'components/lib'
import { useAuth } from 'context/auto-context'
import  styled from '@emotion/styled'
import { ProjectListScreen } from 'screens/project-list'
import { ProjectScreen } from 'screens/project-screen'
import { Dropdown, Menu, Button } from 'antd'
import { ReactComponent as Logo} from 'assets/logo.svg'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />} />
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  )
}

const PageHeader = () => {
  const { logout, user } = useAuth()
  const menu = (
    <Menu>
      <Menu.Item key={'logout'}>
      <Button type={'link'} onClick={logout}>登出</Button>
      </Menu.Item>
    </Menu>
  )
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Logo width={'30rem'} height={'4rem'} color={'rgb(38, 132, 255)'}></Logo>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={menu}>
          <Button type={'link'} onClick={e => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`
// const Header = styled.header`
// grid-area: 'header';
// display: flex;
// flex-direction: row;
// align-items: center;
// justify-content: space-between;
// `
// || 替换
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
z-index: 1;
`

const HeaderLeft = styled(Row)`
display: flex;
align-items: center;
`
const HeaderRight = styled.div`
`
const Main = styled.main`
`