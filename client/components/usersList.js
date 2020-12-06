import { gql, useQuery, useMutation } from "@apollo/client";
import { Box, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";

export const ALL_USERS_QUERY = gql`
  query allUsers {
    users {
      username
      email
      id
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      user {
        id
        username
      }
      errors {
        field
        message
      }
    }
  }
`;

export default function UserList() {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  const [register, { data: registerData }] = useMutation(REGISTER_USER);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState({ pw: false, cpw: false });

  if (error) return <div>error loading users</div>;
  if (loading) return <div>loading</div>;

  const handleSubmit = () => {
    register({ variables: { username: username, email: email, password: password } });
  };

  return (
    <Box display="flex" flexDirection="column">
      {registerData && <div>{JSON.stringify(registerData)}</div>}
      <Input label="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <InputGroup>
        <Input
          placeholder="Enter password"
          type={show.pw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button size="sm" onClick={() => setShow({ ...show, pw: !show.pw })}>
            {show.pw ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <InputGroup>
        <Input
          placeholder="Confirm password"
          type={show.cpw ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button size="sm" onClick={() => setShow({ ...show, cpw: !show.cpw })}>
            {show.cpw ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button onClick={() => handleSubmit()}>Submit</Button>
    </Box>
  );
}
