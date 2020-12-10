import { useAuth } from "../utils/auth";
import Auth from "../components/Auth";

export default function Register() {
  const auth = useAuth();

  const handleRegister = ({ email, password, username }) => {
    auth.handleRegister(email, username, password);
  };

  return <Auth type="Register" onSubmit={handleRegister} />;
}
