import * as React from 'react'

import { Link } from 'react-router-dom'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { User } from './search-panel'
export interface Project {
  id: string
  name: string
  personId: string
  organization: string
  pin: boolean
  created: number
}

// type PropsType = Omit<ListProps, 'users'>
interface ListProps extends TableProps<Project>{
  // list: Project[]
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  const columns = [
    {
      title: '名称',
      render (value: Project, project: Project) {
        return <Link to={String(project.id)}>{project.name}</Link>
      },
      sorter: (a:{name: string}, b:{name: string}) => a.name.localeCompare(b.name)
    },
    {
      title: '部门',
      dataIndex: 'organization'
    },
    {
      title: '负责人',
      render (value:Project, project:Project) { // value, project
      return <span key={value.id}>
          {users.find(user => user.id === project.personId)?.name || '未知'}
        </span>
      }
    },
    {
      title: '创建时间',
      render(value:Project, project: Project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      }
    }
  ]
  // dataSource={list}
  return <Table
    pagination={false}
    columns={columns}
    {...props}
  />
}