import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { register, user } = useAuth();
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
    if (!form.username || !form.password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      await register(form);
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
