import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'

import TodoContainer from './components/TodoContainer'
import TodoInput from './components/TodoInput'
import TodoListItem from './components/TodoListItem'
import { TodoItem } from './interfaces/TodoItem'
import { TodoItemStatus } from './interfaces/TodoItemStatus'

const App = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([])

  const { loading, error, data } = useQuery<{ items: TodoItem[] }>(gql`
    query GetTodoItems {
      items {
        id
        value
        status
      }
    }
  `)

  let content

  if (loading) {
    content = 'loading'
  } else if (error) {
    content = 'error'
  } else if (data && Array.isArray(data.items)) {
    content = (
      <ul>
        {data.items.map((item, index) => (
          <TodoListItem
            key={item.id}
            value={item.value}
            status={item.status}
            handleRemove={(e) => {
              e.preventDefault()
              setTodoList((state) => state.filter((item, itemIndex) => index !== itemIndex))
            }}
            handleStatus={(e) => {
              e.preventDefault()
              setTodoList((state) => {
                const tempState = [...state]
                tempState.splice(index, 1, {
                  id: item.id,
                  value: item.value,
                  status: item.status === TodoItemStatus.DONE ? TodoItemStatus.IN_PROGRESS : TodoItemStatus.DONE,
                })
                return tempState
              })
            }}
          />
        ))}
      </ul>
    )
  }

  return (
    <TodoContainer>
      <TodoInput />
      {content}
    </TodoContainer>
  )
}

export default App
