import { gql } from '@apollo/client';

const Subscription = {
  subsTodoList: gql`
    subscription TodoListSubscription {
      list: todos_todos(order_by: {id: asc}) {
        id
        title
        completed
      }
    }
  `,
  subsTodoItem: gql`
    subscription TodoItemSubscription($id: Int = 10) {
      result: todos_todos_by_pk(id: $id) {
        id
        title
        completed
      }
    }
  `,
};

export default Subscription;
