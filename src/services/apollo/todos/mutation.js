import { gql } from '@apollo/client';

const Mutation = {
  addTodo: gql`
    mutation AddTodo($title: String = "") {
      result: insert_todos_todos(objects: {title: $title}) {
        affected_rows
      }
    }
  `,

  updateTodoCompletedStatus: gql`
    mutation UpdateTodoCompletedStatus($id: Int = 1, $completed: Boolean = true) {
      result: update_todos_todos_by_pk(pk_columns: {id: $id}, _set: {completed: $completed}) {
        title
        completed
      }
    }
  `,

  deleteTodoById: gql`
    mutation DeleteTodoById($id: Int = 1) {
      result: delete_todos_todos_by_pk(id: $id) {
        id
      }
    }
  `,
};

export default Mutation;
