import { TodoItemStatus } from './TodoItemStatus'

export interface TodoItem {
  id: string
  value: string
  status: TodoItemStatus
}
