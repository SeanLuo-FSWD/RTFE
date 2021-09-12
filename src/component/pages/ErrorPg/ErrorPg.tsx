import React, { useState } from "react";
import { Link } from "react-router-dom";

const ErrorPg = (props: any) => {
  const goback_path = props?.location?.state?.goback_path
    ? props.location.state.goback_path
    : null;
  const err_msg = props?.location?.state?.err_msg
    ? props.location.state.err_msg
    : "Could server be down?";
  return (
    <div>
      <h1>error</h1>
      {Array.isArray(err_msg) ? (
        err_msg.map((m: string) => {
          return <h2>{m}</h2>;
        })
      ) : (
        <h2>{err_msg}</h2>
      )}
      {goback_path && <Link to={goback_path}>Back</Link>}
    </div>
  );
};

export default ErrorPg;
