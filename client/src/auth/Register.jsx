import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: call POST /users/register in your API
    if (!form.username || !form.password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data = null;
      const text = await response.text();
      if (text) {
        data = JSON.parse(text);
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      // await register(form);

      navigate("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Please try registering again.");
    }
  };

  return (
    <main className="register-page">
      <h1>Register</h1>
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
        <button>Sign up</button>
      </form>

      {/* linking register page to login page in case user already has an account  */}

      <p className="link">
        Already have an account?{" "}
        <Link to="/login" className="links">
          Login here
        </Link>
      </p>
    </main>
  );
}
