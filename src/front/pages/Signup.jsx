import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authApi";

export const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerRequest(form.email, form.password);
      navigate("/login", { replace: true });
    } catch (error) {
      setError(error.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h1>Registro</h1>
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
          {loading ? "Cargando..." : "Crear cuenta"}
        </button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
      <p className="mt-3">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};
