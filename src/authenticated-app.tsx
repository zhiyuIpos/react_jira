import React from 'react'

import { Row } from 'components/lib'
import { useAuth } from 'context/auto-context'
import  styled from '@emotion/styled'
import { ProjectListScreen } from 'screens/project-list'
import { Dropdown, Menu, Button } from 'antd'
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth()

  const menu = (
    <Menu>
      <Menu.Item key={'logout'}>
      <Button type={'link'} onClick={logout}>登出</Button>
      </Menu.Item>
    </Menu>
  )
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h3>LOGO</h3>
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
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
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