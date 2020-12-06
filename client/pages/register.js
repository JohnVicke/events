import { useAuth } from "../utils/auth";
import { Box, Container, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Auth from "../components/Auth";

export default () => {
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();

  const handleRegister = ({ email, pass }) => {
    const res = auth.handleRegister(email, pass);
  };

  return <Auth type="Register" onSubmit={handleRegister} />;
};
