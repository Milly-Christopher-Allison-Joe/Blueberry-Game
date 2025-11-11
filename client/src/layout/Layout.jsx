import Navbar from "./Navbar.jsx";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "64px" }}>{children}</main>
    </>
  );
}
