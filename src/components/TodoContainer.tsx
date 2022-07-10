import React, { FunctionComponent, PropsWithChildren } from 'react'

type TodoContainerProps = {}

const TodoContainer: FunctionComponent<PropsWithChildren<TodoContainerProps>> = ({ children }) => {
  return <div className="w-full m-2 md:w-8/12 lg:w-5/12 md:m-0 p-2">{children}</div>
}

export default TodoContainer
