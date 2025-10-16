import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export const Navbar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>

        <div className="ml-auto d-flex align-items-center gap-2">
          <Link to="/demo">
            <button className="btn btn-outline-secondary">Demo</button>
          </Link>

          <Link to="/private" className="ms-2">
            <button className="btn btn-outline-primary">Privado</button>
          </Link>

          {!token && (
            <>
              <Link to="/login" className="ms-2">
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to="/signup" className="ms-2">
                <button className="btn btn-success">Signup</button>
              </Link>
            </>
          )}

          {token && (
            <>
              <span className="ms-3 me-2">{user?.email}</span>
              <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
