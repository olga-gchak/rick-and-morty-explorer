import {GraphQLClient} from 'graphql-request';

export const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
  'https://rickandmortyapi.com/graphql';

export const gqlClient = new GraphQLClient(GRAPHQL_ENDPOINT);
