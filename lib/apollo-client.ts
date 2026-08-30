import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { SetContextLink } from '@apollo/client/link/context';
import { config } from './config';

declare module '@apollo/client' {
  namespace ApolloClient {
    namespace DeclareDefaultOptions {
      interface WatchQuery {
        errorPolicy?: 'none' | 'all' | 'ignore';
      }
      interface Query {
        errorPolicy?: 'none' | 'all' | 'ignore';
      }
    }
  }
}

const httpLink = new HttpLink({
  uri: config.graphqlUrl,
  credentials: 'include',
});

const authLink = new SetContextLink((prevContext, operation) => {
  return {
    headers: {
      ...prevContext.headers,
      'Content-Type': 'application/json',
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Page: {
        keyFields: ['id'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
