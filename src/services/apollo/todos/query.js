import { gql } from '@apollo/client';

const Query = {
  getTodoList: gql`
    query GetTodoList {
      list: todos_todos(order_by: {id: asc}) {
        id
        title
        completed
      }
    }
  `,

  getTodoById: gql`
    query GetTodoById ($id: Int = 1) {
      result: todos_todos_by_pk(id: $id) {
        id
        title
        completed
      }
    }
  `,
};

export default Query;
