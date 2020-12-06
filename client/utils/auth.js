import { gql, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";

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

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [register] = useMutation(REGISTER_USER);

  const router = useRouter();
  const toast = useToast();

  const handleRegister = (email, password) => {
    register({ variables: { username: "tester", email: email, password: password } })
      .then(({ data }) => {
        return data.register;
      })
      .then(({ user, errors }) => {
        if (errors) {
          return errors.map((error) => {
            toast({
              title: "Ooops, an error occured.",
              description: error.message,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
        }
        setUser(user);
        toast({
          title: `Success, welcome onboard ${user.username}! 🍻`,
          description: "Your account has been created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/");
      });
  };

  return {
    user,
    handleRegister,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
