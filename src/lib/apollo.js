import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://democontenthub.wpengine.com/graphql",
  cache: new InMemoryCache()
});

export default client;
