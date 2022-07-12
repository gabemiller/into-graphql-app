import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const typeDefs = gql`
  enum TodoItemStatus {
    IN_PROGRESS
    DONE
  }

  type TodoItem {
    id: String
    value: String
    status: TodoItemStatus
  }

  type Query {
    items: [TodoItem]
  }

  type Mutation {
    createTodoItem(value: String!, status: TodoItemStatus!): TodoItem
    updateTodoItem(id: String!, status: TodoItemStatus!): TodoItem
    deleteTodoItem(id: String!): TodoItem
  }
`

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  typeDefs,
})

export default client
