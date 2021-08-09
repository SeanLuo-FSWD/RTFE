import React, { useState } from "react";
import { Link } from "react-router-dom";

const ErrorPg = (props: any) => {
  const prev_path = props.location.state.pathname;
  const err_msg = props.location.state.err_msg;
  return (
    <div>
      <h1>error</h1>
      {Array.isArray(err_msg) ? (
        err_msg.map((m: string) => {
          return <h2 data-cy="ErrorPg_errMsg">{m}</h2>;
        })
      ) : (
        <h2 data-cy="ErrorPg_errMsg">{err_msg}</h2>
      )}
      <Link data-cy="ErrorPg_back" to={prev_path}>Back</Link>
    </div>
  );
};

export default ErrorPg;