import * as React from 'react'
import { Table } from 'antd'
import dayjs from 'dayjs'
import { User } from './search-panel'
interface Project {
  id: string
  name: string
  personId: string
  organization: string
  pin: boolean
  created: number
}
interface ListProps {
  list: Project[]
  users: User[]
}

export const List = ({list, users}: ListProps) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
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
  return <Table
    pagination={false}
    columns={columns}
    dataSource={list}
  />
}