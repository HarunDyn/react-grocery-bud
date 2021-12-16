import React from "react";

function Alert({ msg, type }) {
  return (
    <>
      <p className={`alert alert-${type}`}> {msg} </p>
    </>
  );
}

export default Alert;
