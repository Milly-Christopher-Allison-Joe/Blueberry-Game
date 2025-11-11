import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: call POST /users/login and validate
    // demo: accept any non-empty creds
    if (form.username && form.password) {
      login(form.username);
      navigate("/profile");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="password"
          type="password"
        />
        <button>Login</button>
      </form>
    </>
  );
}
