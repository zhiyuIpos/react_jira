import React, { ReactNode } from 'react'

type FallbackRender = (props: {error: Error | null}) => React.ReactElement
// interface IProps {
//   children: ReactNode
//   fallbackRender: FallbackRender
// }
// IProps
interface IState {
  error: Error | null
}
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, IState> {
  state = {error:null}
  /**
   * @param error 
   * @returns 
   * 当子组件抛出异常，这里会接收到并且调用
   */
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render () {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({error})
    }
    return children
  }
}