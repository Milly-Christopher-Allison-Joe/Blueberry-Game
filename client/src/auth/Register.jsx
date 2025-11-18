import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: call POST /users/register in your API
    // if success => maybe auto-login or navigate to /login
    alert(`Pretend registered: ${form.username}`);
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
