import React, { FunctionComponent } from 'react'

type TodoInputProps = {
  value: string
  changeValue: (e: React.FormEvent<HTMLInputElement>) => void
  handleAdd: (e: React.KeyboardEvent) => void
}

const TodoInput: FunctionComponent<TodoInputProps> = ({ value, changeValue, handleAdd }) => {
  return (
    <input
      className="w-full px-4 py-2 mb-4 border-2 border-slate-200 focus:border-sky-300 focus:outline-0"
      name="todo-item"
      type="text"
      value={value}
      onInput={changeValue}
      onKeyDown={handleAdd}
      placeholder="Write an item e.g. 'Create Todo App' and Press ENTER"
    />
  )
}

export default TodoInput
