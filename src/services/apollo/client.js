import {
  ApolloClient, InMemoryCache, split, HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_APOLLO_KEY,
  },
});

const wsLink = new GraphQLWsLink(createClient({
  url: process.env.REACT_APP_GRAPHQL_WS_URL,
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
