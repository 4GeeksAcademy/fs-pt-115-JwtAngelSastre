const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const loginRequest = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || "Error en el inicio de sesión");
  return data;
};

export const registerRequest = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || "Error en el registro");
  return data;
};

export const meRequest = async (token) => {
  const response = await fetch(`${BASE_URL}/api/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || "No autorizado");
  return data;
};
