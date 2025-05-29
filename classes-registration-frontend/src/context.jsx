// src/context.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSportClasses, registerUserToSportClass } from "./services/sportClassService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sportClasses, setSportClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSportClass, setSelectedSportClass] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  useEffect(() => {
    fetchSportClasses();
  }, []);

  const fetchSportClasses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSportClasses();
      setSportClasses(data);
    } catch (err) {
      setError("Klaida gaunant užsiėmimus");
    }
    setLoading(false);
  };

  const registerToSportClass = async (sportClassId, userId) => {
    setLoading(true);
    setError(null);
    setRegistrationSuccess(null);
    try {
      await registerUserToSportClass(sportClassId, userId);
      setRegistrationSuccess("Sėkmingai užregistruota į užsiėmimą!");
      await fetchSportClasses(); // atnaujinti sąrašą
    } catch (err) {
      setError("Registracija nepavyko");
    }
    setLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        sportClasses,
        loading,
        error,
        selectedSportClass,
        setSelectedSportClass,
        registerToSportClass,
        registrationSuccess,
        setRegistrationSuccess,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
