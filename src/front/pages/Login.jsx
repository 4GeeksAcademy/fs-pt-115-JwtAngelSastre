import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export const Login = () => {
  const { login, error, loading, token } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/private", { replace: true });
  }, [token, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await login(form.email, form.password);
    if (ok) navigate("/private", { replace: true });
  };

  return (
    <div className="container py-4">
      <h1>Inicio de sesión</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <label className="form-label mt-3">Email</label>
        <input
          name="email"
          type="email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label className="form-label mt-3">Contraseña</label>
        <input
          name="password"
          type="password"
          className="form-control"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary mt-3" type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Entrar"}
        </button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
      <p className="mt-3">
        ¿No tienes cuenta? <Link to="/signup">Crear cuenta</Link>
      </p>
    </div>
  );
};
