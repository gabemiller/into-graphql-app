import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'

import TodoContainer from './components/TodoContainer'
import TodoInput from './components/TodoInput'
import TodoListItem from './components/TodoListItem'
import { TodoItem } from './interfaces/TodoItem'
import { TodoItemStatus } from './interfaces/TodoItemStatus'

const App = () => {
  const { loading, error, data } = useQuery<{ items: TodoItem[] }>(gql`
    query GetTodoItems {
      items {
        id
        value
        status
      }
    }
  `)

  const [deleteTodoItem] = useMutation<TodoItem>(
    gql`
      mutation DeleteTodoItem($id: String!) {
        deleteTodoItem(id: $id) {
          id
          value
          status
        }
      }
    `,
    {
      refetchQueries: ['GetTodoItems'],
    }
  )

  const [updateTodoItem] = useMutation<TodoItem>(
    gql`
      mutation UpdateTodoItem($id: String!, $status: TodoItemStatus!) {
        updateTodoItem(id: $id, status: $status) {
          id
          value
          status
        }
      }
    `,
    {
      refetchQueries: ['GetTodoItems'],
    }
  )

  let content

  if (loading) {
    content = 'loading'
  } else if (error) {
    content = 'error'
  } else if (data && Array.isArray(data.items)) {
    content = (
      <ul>
        {data.items.map((item) => (
          <TodoListItem
            key={item.id}
            value={item.value}
            status={item.status}
            handleRemove={async (e) => {
              e.preventDefault()
              await deleteTodoItem({ variables: { id: item.id } })
            }}
            handleStatus={async (e) => {
              e.preventDefault()
              await updateTodoItem({
                variables: { id: item.id, status: item.status === TodoItemStatus.DONE ? TodoItemStatus.IN_PROGRESS : TodoItemStatus.DONE },
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
