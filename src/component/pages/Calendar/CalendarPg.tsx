import React from "react";
import { Calendar } from "antd";
import "./CalendarPg.scss";
import PortalModal from "../../Modal/PortalModal";

function CalendarPg() {
  const [openModal, setOpenModal] = React.useState(false);

  const onSelect = (date: any) => {
    console.log(date._d);
  };

  const dateCellRender = (date: any) => {
    return <button onClick={() => setOpenModal(true)}>Open Modal</button>;
  };

  return (
    <div id="calendarPg">
      <Calendar
        onSelect={onSelect}
        dateCellRender={(date) => dateCellRender(date)}
      />
      <PortalModal openModal={openModal} closeModal={() => setOpenModal(false)}>
        <p>Modal content</p>
      </PortalModal>
    </div>
  );
}

export default CalendarPg;
