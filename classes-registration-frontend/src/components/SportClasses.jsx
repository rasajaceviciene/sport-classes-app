// src/components/SportClasses.jsx

import React from "react";
import { useGlobalContext } from "../context";
import Registration from "./Registration";

const SportClasses = () => {
  const {
    sportClasses,
    loading,
    error,
    setSelectedSportClass,
    selectedSportClass,
    registrationSuccess,
    setRegistrationSuccess,
  } = useGlobalContext();

return (
  <div className="container my-4">
    <div className="row mb-4">
      <div className="col-md-5 d-flex flex-column justify-content-center">
        <h1>Sportuok lengvai</h1>
        <p>
          Prisijunkite prie geriausių sporto užsiėmimų ir lavinkite savo įgūdžius kartu su patyrusiais treneriais!
        </p>
      </div>
      <div className="col-md-7">
        <img
          src="/sport.jpg"
          alt="Seminar banner"
          className="img-fluid rounded"
        />
      </div>
    </div>
    <h2>Sporto užsiėmimų sąrašas</h2>

      {loading && (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Kraunasi...</span>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {registrationSuccess && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {registrationSuccess}
          <button
            type="button"
            className="btn-close"
            onClick={() => setRegistrationSuccess(null)}
          ></button>
        </div>
      )}

      {sportClasses.map((sportClass) => (
        <div key={sportClass._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{sportClass.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Lektorius: {sportClass.trainer}
            </h6>
            <p className="card-text">
              {sportClass.description}
              <br />
              Trukmė: {sportClass.durationHours} val.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setSelectedSportClass(sportClass)}
            >
              Registruotis
            </button>
          </div>
        </div>
      ))}

      {selectedSportClass && (
        <Registration
          sportClass={selectedSportClass}
          onClose={() => setSelectedSportClass(null)}
        />
      )}
    </div>
  );
};

export default SportClasses;
