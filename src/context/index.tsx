import React, { ReactNode } from 'react'

import { AuthProvider } from 'context/auto-context'

export const AppProviders = ({children}: { children: ReactNode }) => {
  return <AuthProvider>
    { children }
  </AuthProvider>
}
