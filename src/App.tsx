import React, { useState } from 'react'

import TodoContainer from './components/TodoContainer'
import TodoInput from './components/TodoInput'
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
            setTodoList((state) => [...state, { value, status: TodoItemStatus.IN_PROGRESS }])
            setValue('')
          }
        }}
      />
      <ul>
        {todoList.map((item, index) => (
          <li key={index}>{item.value}</li>
        ))}
      </ul>
    </TodoContainer>
  )
}

export default App
