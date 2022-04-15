import { gql } from '@apollo/client';

const Mutation = {
  createUser: gql`
    mutation CreateUser($username: String = "", $password: String = "") {
      result: insert_todos_users_one(object: {password: $password, username: $username}) {
        id
        username
      }
    }
  `,
};

export default Mutation;
