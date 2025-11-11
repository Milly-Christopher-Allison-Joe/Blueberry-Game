import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <>
      <h1>Profile</h1>
      <p>Welcome, {user?.username}!</p>
    </>
  );
}
