import { faTrashCan, faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'

import { TodoItemStatus } from '../interfaces/TodoItemStatus'
import { className } from '../utils'

type TodoListItemProps = {
  value: string
  status: TodoItemStatus
  handleStatus: (e: React.MouseEvent) => Promise<void>
  handleRemove: (e: React.MouseEvent) => Promise<void>
}

const TodoListItem: FunctionComponent<TodoListItemProps> = ({ value, status, handleStatus, handleRemove }) => {
  return (
    <li className="flex items-center w-full p-4 mb-2 bg-white shadow">
      <button className="transition-colors text-slate-700 hover:text-slate-500" onClick={handleStatus}>
        <FontAwesomeIcon icon={status === TodoItemStatus.DONE ? faCheckSquare : faSquare} />
      </button>
      <span className={className('flex-1 mx-2', status === TodoItemStatus.DONE && 'line-through')}>{value}</span>
      <span
        className={className(
          'inline-block mx-2 px-2 py-1 rounded-lg text-xs font-mono',
          status === TodoItemStatus.IN_PROGRESS ? 'bg-sky-100 text-sky-700' : 'bg-green-100 text-green-700'
        )}
      >
        {status}
      </span>
      <button className="transition-colors text-red-400 hover:text-red-500" onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </li>
  )
}

export default TodoListItem
