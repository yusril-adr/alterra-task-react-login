import { gql } from '@apollo/client';

const Query = {
  getUserByUsername: gql`
    query GetUserByUsername($username: String = "") {
      result: todos_users(where: {username: {_eq: $username}}) {
        id
        username
        password
      }
    }
  `,
};

export default Query;
