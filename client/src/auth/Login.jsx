import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty login fields
    if (!form.username || !form.password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      await login(form);
    } catch (error) {
      alert(error.message || "Please try logging in again.");
    }
  };

  return (
    <main className="login-page">
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

      {/* link the login page to register in case user does not have a current account  */}
      <p className="link">
        Don't have an account?{" "}
        <Link to="/register" className="links">
          Register here
        </Link>
      </p>
    </main>
  );
}
