import React from 'react'
import { Form, Input } from 'antd'

import { LongButton } from './index'
import { useAuth } from 'context/auto-context'
import { useAsync } from 'utils/use-async'

// const apiUrl = process.env.REACT_APP_API_URL
export const RegisterScreen = ({ onError }: { onError: (error:Error) => void}) => {
  const { register } = useAuth()
  const {run, isLoading} = useAsync(undefined, { throwOnError: true })
  const handleSubmit = async ({ cpassword, ...values }:{username:string, password:string, cpassword: string}) => {
    // event.preventDefault()
    // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'))
      return
    }
    try {
      await run(register(values))
    } catch(e) {
      onError(e)
    }
    // register(values)
  }
  // const login = (params: {username: string, password :string }) => {
  //   fetch(`${apiUrl}/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(params)
  //   }).then(res => {
  //     if (res.ok) {
  //       console.log(res.json())
  //     }
  //   })
  // }
  return <Form onFinish={handleSubmit}>
    <Form.Item
      name={'username'}
      rules={[
        {
          required: true,
          message: '请输入用户名'
        }
      ]}
    >
      <Input placeholder={'用户名'} type="text" id={'username'} />
    </Form.Item>
    <Form.Item
      name={'password'}
      rules={[
        {
          required: true,
          message: '请输入密码'
        }
      ]}
    >
    <Input placeholder={'密码'} type="password" id={'password'} />
    </Form.Item>
    <Form.Item
      name={'cpassword'}
      rules={[
        {
          required: true,
          message: '请确认密码'
        }
      ]}
    >
    <Input placeholder={'请确认密码'} type="password" id={'cpassword'} />
    </Form.Item>
    <Form.Item>
      <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>注册</LongButton>
    </Form.Item>
  </Form>
}