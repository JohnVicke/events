import { useAuth } from "../utils/auth";
import Auth from "../components/Auth";

export default function Login() {
  const auth = useAuth();

  const handleLogin = ({ usernameOrEmail, password }) => {
    auth.handleLogin(usernameOrEmail, password);
  };

  return <Auth type="Log in" onSubmit={handleLogin} />;
}
