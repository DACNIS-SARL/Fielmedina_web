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

// Create HTTP link to your Django GraphQL endpoint
const httpLink = new HttpLink({
  uri: config.graphqlUrl,
  credentials: 'include', // Include cookies for authentication
});

// Create auth link to add headers if needed
const authLink = new SetContextLink((prevContext, operation) => {
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...prevContext.headers,
      'Content-Type': 'application/json',
    }
  }
});

// Create the Apollo Client instance
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
