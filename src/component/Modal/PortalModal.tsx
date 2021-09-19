import React, { useState } from "react";
import { createPortal } from "react-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    backgroundColor: "red",
    padding: "2em",
    zIndex: "9",
  },
};

function PortalModal({ openModal, children, closeModal }: any) {
  const portalRoot: any = document.getElementById("root");

  if (!openModal) {
    return null;
  } else {
    return createPortal(
      <>
        <div style={customStyles.content}>
          {children}
          <button onClick={closeModal}>Close</button>
        </div>
      </>,

      portalRoot
    );
  }
}

export default PortalModal;
