import { gql, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

export const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
      }
      errors {
        field
        message
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      user {
        id
        username
        email
      }
      errors {
        field
        message
      }
    }
  }
`;

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [register] = useMutation(REGISTER_USER);
  const [login, { loading: loginLoading, error: loginError, data: loginData }] = useMutation(LOGIN_USER);

  const router = useRouter();
  const toast = useToast();

  const handleErrors = (errors) => {
    return errors.map((error) => {
      toast({
        title: "Ooops, an error occured.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  const handleSuccess = (header, message, user, route = null) => {
    setUser(user);
    toast({
      title: header,
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    if (route) router.push(route);
  };

  const handleRegister = (email, username, password) => {
    register({ variables: { username: username, email: email, password: password } })
      .then(({ data }) => {
        return data.register;
      })
      .then(({ user, errors }) => {
        if (errors) {
          return handleErrors(errors);
        }
        handleSuccess(`Success, welcome onboard ${user.username}! 🍻`, "Your account has been created", user, "/");
      });
  };

  const handleLogin = (usernameOrEmail, password) => {
    login({ variables: { usernameOrEmail, password } })
      .then(({ data }) => {
        return data.login;
      })
      .then(({ user, errors }) => {
        if (errors) {
          return handleErrors(errors);
        }
        handleSuccess(`Welcome back, ${user.username}! 🍻`, "Succesfully logged in", user, "/");
      });
  };

  return {
    user,
    handleRegister,
    handleLogin,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
