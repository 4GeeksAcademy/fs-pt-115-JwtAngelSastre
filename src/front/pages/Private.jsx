import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";

export const Private = () => {
  const { validate, logout, user } = useAuth();
  const [message, setMessage] = useState("Validando...");

  useEffect(() => {
    const run = async () => {
      try {
        const data = await validate(); // { user }
        setMessage(`Bienvenido, ${data.user.email}`);
      } catch (error) {
        setMessage("No autorizado. Redirigiendo a login...");
        logout();
      }
    };
    run();
  }, [validate, logout]);

  return (
    <div className="container py-4">
      <h1>Zona privada</h1>
      <p className="mt-2">{message}</p>
      {user && <p className="text-muted">ID de usuario: {user.id}</p>}
    </div>
  );
};
