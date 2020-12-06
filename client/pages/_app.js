import "../styles/global.scss";
import { ApolloProvider } from "@apollo/client";
import { ColorModeProvider, ThemeProvider, CSSReset, ChakraProvider } from "@chakra-ui/react";
import { useApollo } from "../lib/apolloClient";
import { ProvideAuth } from "../utils/auth";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ChakraProvider>
      <CSSReset />
      <ApolloProvider client={apolloClient}>
        <ProvideAuth>
          <Component {...pageProps} />
        </ProvideAuth>
      </ApolloProvider>
    </ChakraProvider>
  );
}
