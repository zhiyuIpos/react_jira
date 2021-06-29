import React from 'react'
import { Routes , Route, Navigate } from 'react-router'
import { Link } from 'react-router-dom'

import { KanBan } from 'screens/kanban'
import { Epic } from 'screens/epic'
export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanBan />} />
        <Route path={'/epic'} element={<Epic />} />
        <Navigate to={window.location.pathname + '/kanban'} />
      </Routes>
    </div>
  )
}