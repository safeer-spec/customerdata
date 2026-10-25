import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import { api } from "../api.js";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    const data = await api.register(values);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/customers");
  };

  return (
    <AuthForm
      title="Create account"
      submitLabel="Register"
      onSubmit={handleRegister}
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
      ]}
      footer={{ text: "Already have an account?", to: "/login", link: "Login" }}
    />
  );
}
