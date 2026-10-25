import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  useLocation();
  const loggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link to="/" className="text-lg font-bold">CRM</Link>
        <div className="flex items-center gap-4 text-sm">
          {loggedIn ? (
            <button onClick={logout} className="rounded bg-white/20 px-3 py-1 hover:bg-white/30">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
