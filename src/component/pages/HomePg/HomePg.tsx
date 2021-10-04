import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../../Navbar/Navbar";
import TaskModal from "../../TaskDetail/TaskDetail";
import TaskList from "../../TaskList/TaskList";

const _Modal_initial = {
  type: null as null | string,
  payload: null as any,
};

function HomePg() {
  const [_Modal, set_Modal] = useState(_Modal_initial);
  const closeModal = () => {
    set_Modal(_Modal_initial);
  };

  const setFormModal = (e: any) => {
    e.preventDefault();
    set_Modal({ type: "form", payload: { date: new Date() } });
  };

  return (
    <div>
      <Navbar />
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h2>Home Page</h2>
      <button onClick={setFormModal}>Add event</button>
      <TaskList />
      <TaskModal
        isOpenProp={_Modal.type}
        closeModalProp={closeModal}
        payloadProp={{ event_obj: _Modal.payload }}
      />
    </div>
  );
}

export default HomePg;
