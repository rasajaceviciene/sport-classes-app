// src/components/Registration.jsx

import React, { useState } from "react";
import { useGlobalContext } from "../context";

const Registration = ({ sportClass, onClose }) => {
  const { registerToSportClass } = useGlobalContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name || !email) {
      setError("Užpildykite vardą ir el. paštą");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Klaida kuriant vartotoją");
        return;
      }
      const user = await res.json();

      await registerToSportClass(sportClass._id, user._id);

      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      onClick={onClose} // visam overlay click
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()} // modal viduje click NEuždaro
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registracija į: {sportClass.title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Vardas</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Įveskite vardą"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">El. paštas</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Įveskite el. paštą"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Registruotis
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
