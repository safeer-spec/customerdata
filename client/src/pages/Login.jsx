import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import { api } from "../api.js";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const data = await api.login(values);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/customers");
  };

  return (
    <AuthForm
      title="Login"
      submitLabel="Login"
      onSubmit={handleLogin}
      fields={[
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
      ]}
      footer={{ text: "No account yet?", to: "/register", link: "Register" }}
    />
  );
}
