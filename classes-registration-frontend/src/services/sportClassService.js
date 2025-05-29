// src/services/sportClassService.js

const API_URL = "http://localhost:8000/api";

export const getSportClasses = async () => {
  const res = await fetch(`${API_URL}/sportclasses`);
  if (!res.ok) throw new Error("Klaida gaunant užsiėmimus");
  return await res.json();
};

// Registracija į kursą (userId perduodamas body JSON)
export const registerUserToSportClass = async (sportClassId, userId) => {
  const res = await fetch(`${API_URL}/sportclasses/${sportClassId}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Registracija nepavyko");
  }
  return await res.json();
};
