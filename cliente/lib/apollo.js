"use client";

import {
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "apollo-link-context";




function makeClient() {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/",
  })

 const authLink = setContext((_, {  headers })=> {
   // leer el storage almacena

   const token  = localStorage.getItem('token')

  return{
    headers : {
      ...headers,
      authorization: token ? `${token}`: ''

    }
  }
 }) 

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(httpLink),
          ])
        :  authLink.concat(httpLink),
        connectToDevTools: true
  });
}

export function ApolloWrapper({ children }) {
   
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}