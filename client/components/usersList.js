import { gql, useQuery, useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@material-ui/core";
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

  if (error) return <div>error loading users</div>;
  if (loading) return <div>loading</div>;

  const handleSubmit = () => {
    register({ variables: { username: username, email: email, password: password } });
  };

  return (
    <Box display="flex" flexDirection="column">
      {registerData && <div>{JSON.stringify(registerData)}</div>}
      <TextField label="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={() => handleSubmit()}>
        Submit
      </Button>
    </Box>
  );
}
