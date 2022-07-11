import { gql, useMutation } from '@apollo/client'
import trim from 'lodash/trim'
import React, { FunctionComponent, useState } from 'react'

import { TodoItem } from '../interfaces/TodoItem'
import { TodoItemStatus } from '../interfaces/TodoItemStatus'

type TodoInputProps = {}

const TodoInput: FunctionComponent<TodoInputProps> = () => {
  const [value, setValue] = useState<string>('')

  const [createTodoItem] = useMutation<TodoItem>(
    gql`
      mutation CreateTodoItem($value: String!, $status: TodoItemStatus!) {
        createTodoItem(value: $value, status: $status) {
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

  return (
    <input
      className="w-full px-4 py-2 mb-4 border-2 border-slate-200 focus:border-sky-300 focus:outline-0"
      name="todo-item"
      type="text"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      onKeyDown={async (e) => {
        if (e.key === 'Enter' && value.length > 0) {
          await createTodoItem({ variables: { value: trim(value), status: TodoItemStatus.IN_PROGRESS } })
          setValue('')
        }
      }}
      placeholder="Write an item e.g. 'Create Todo App' and Press ENTER"
    />
  )
}

export default TodoInput
