import "../styles/global.scss";
import { ApolloProvider } from "@apollo/client";
import { ColorModeProvider, ThemeProvider, CSSReset, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useApollo } from "../lib/apolloClient";
import { ProvideAuth } from "../utils/auth";

const config = {
  useSystemColorMode: true,
};

const customTheme = extendTheme({ config });

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <ApolloProvider client={apolloClient}>
        <ProvideAuth>
          <Component {...pageProps} />
        </ProvideAuth>
      </ApolloProvider>
    </ChakraProvider>
  );
}
