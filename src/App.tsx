import trim from 'lodash/trim'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'

import TodoContainer from './components/TodoContainer'
import TodoInput from './components/TodoInput'
import TodoListItem from './components/TodoListItem'
import { TodoItem } from './interfaces/TodoItem'
import { TodoItemStatus } from './interfaces/TodoItemStatus'

const App = () => {
  const [value, setValue] = useState<string>('')
  const [todoList, setTodoList] = useState<TodoItem[]>([])
  return (
    <TodoContainer>
      <TodoInput
        value={value}
        changeValue={(e) => setValue(e.currentTarget.value)}
        handleAdd={(e) => {
          if (e.key === 'Enter' && value.length > 0) {
            setTodoList((state) => [...state, { id: nanoid(), value: trim(value), status: TodoItemStatus.IN_PROGRESS }])
            setValue('')
          }
        }}
      />
      <ul>
        {todoList.map((item, index) => (
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
    </TodoContainer>
  )
}

export default App
