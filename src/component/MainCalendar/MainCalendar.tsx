import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "antd";
import "./MainCalendar.scss";
import { INITIAL_EVENTS } from "../../fakeDb/event-utils";
import dateCellRender from "./properties/dateCellRender";
import CalModals from "./calModals";
import onSelect from "./properties/onSelect";

const _Modal_initial = {
  type: null as null | string,
  payload: null as any,
};

function MainCalendar() {
  const [_Modal, set_Modal] = useState(_Modal_initial);

  useEffect(() => {
    console.log("_Modal");

    console.log(_Modal);
  });

  const setDetailModal = (e: any, event_id: string | number) => {
    e.stopPropagation();
    for (let i = 0; i < INITIAL_EVENTS.length; i++) {
      if (event_id === INITIAL_EVENTS[i].id) {
        set_Modal({ type: "event", payload: INITIAL_EVENTS[i] });
      }
    }
  };

  const setFormModal = (date: Date) => {
    set_Modal({ type: "form", payload: { date } });
  };

  const closeModal = () => {
    set_Modal(_Modal_initial);
  };

  const onAfterOpen = () => {};

  return (
    <div id="calendarMain">
      <Calendar
        dateCellRender={(date) => dateCellRender(date, setDetailModal)}
        onSelect={(date) => onSelect(date, setFormModal)}
      />
      {_Modal.type && (
        <CalModals
          isOpenProp={_Modal.type}
          closeModalProp={closeModal}
          onAfterOpenProp={onAfterOpen}
          payloadProp={{ event_obj: _Modal.payload }}
        />
      )}
    </div>
  );
}

export default MainCalendar;
