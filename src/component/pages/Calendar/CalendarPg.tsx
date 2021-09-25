import React, { useState, useEffect } from "react";
import { Calendar } from "antd";
import "./CalendarPg.scss";
import Picker from "react-calendar";
import Modal from "react-modal";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import "react-calendar/dist/Calendar.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

let event_data = {
  id: null,
  title: null,
  description: null,
  duration: [],
} as any;

const initialForm = {
  title: null,
  description: null,
  type: "once",
};

function CalendarPg() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formModalIsOpen, setIsFormOpen] = useState(false);
  const [formValue, setFormValue] = useState(initialForm) as any;

  // useEffect(() => {
  //   // console.log('formValue');
  //   // console.log(formValue);

  // });

  useEffect(() => {}, [formValue]);

  const date_select = () => {
    switch (formValue.type) {
      case "once":
        return (
          <>
            <p>Pick start and end date</p>
            {/* {formValue.duration[0] && <p>Start: {formValue.duration[0]}</p>} */}
            <Picker onChange={(date: any) => pickDates(date)} />
          </>
        );

      case "monthly":
        return <div>monthly</div>;
      case "weekly":
        return <div>weekly</div>;
      default:
        return null;
    }
  };

  const pickDates = (date: any) => {
    console.log("pickDates");
    console.log(date);

    let new_duration = formValue.duration.push(date.toString());

    new_duration = formValue.duration.sort((a: any, b: any) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.valueOf() - dateB.valueOf();
    });

    console.log("new duration");
    console.log(new_duration);

    setFormValue({
      ...formValue,
      duration: new_duration,
    });
  };

  const newEventSubmit = (e: any) => {
    e.preventDefault();

    console.log("formValue.duration[1] formValue.duration[1] ");
    console.dir(formValue);

    let date = new Date(formValue.duration[1]).setHours(24, 0, 0, 0);
    let fixed_date = new Date(date);

    console.log(
      "corrected_end_date corrected_end_date corrected_end_date: " + fixed_date
    );

    INITIAL_EVENTS.push({ ...formValue, end: fixed_date.toString() });
    setFormValue(initialForm);
    closeModal();
  };
  function closeModal() {
    if (modalIsOpen) {
      setIsOpen(false);
    }

    if (formModalIsOpen) {
      setIsFormOpen(false);
    }
  }

  function openModal(e: any, eleId: any) {
    e.stopPropagation();
    // Equivalent of an API call with eleId
    for (let i = 0; i < INITIAL_EVENTS.length; i++) {
      if (eleId === INITIAL_EVENTS[i].id) {
        event_data = INITIAL_EVENTS[i];
        setIsOpen(true);
      }
    }
  }

  const onSelect = (date: any) => {
    let clickedDay = new Date(date);
    let formatDay = new Date(
      clickedDay.getFullYear(),
      clickedDay.getMonth(),
      clickedDay.getDate(),
      0,
      0,
      0
    ).toString();

    setFormValue({
      ...formValue,
      duration: [formatDay],
    });
    setIsFormOpen(true);
  };

  const dateCellRender = (date: any) => {
    const calDate = date._d;
    let ele_arr = null;

    ele_arr = INITIAL_EVENTS.map((ele) => {
      let startDate;
      let endDate;
      const item = (
        <button onClick={(e) => openModal(e, ele.id)}>{ele.title}</button>
      );

      if (ele.type === "once") {
        startDate = new Date(ele.duration![0]);
        endDate = new Date(ele.duration![1]);
        // console.log('calDate ' + calDate);
        // console.log('startDate ' + startDate);
        // console.log('endDate ' + endDate);
        if (calDate >= startDate && calDate <= endDate) {
          return item;
        }
      } else {
        const day =
          ele.type === "monthly"
            ? new Date(date).getDate()
            : new Date(date).getDay();

        for (let i = 0; i < ele.days!.length; i++) {
          if (day === ele.days![i]) {
            return item;
          }
        }
      }
    });

    return ele_arr;

    // return <button onClick={() => setIsOpen(true)}>Open Modal</button>;
  };

  return (
    <div id="calendarPg">
      <Calendar
        onSelect={onSelect}
        dateCellRender={(date) => dateCellRender(date)}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <form>
          <input />
          <p>Title: {event_data.title}</p>
          <p>Description: {event_data.description}</p>
          {event_data.duration[0] && (
            <div>
              {" "}
              <p>start: {event_data.duration[0]}</p>
              <p>end: {event_data.duration[1]}</p>
            </div>
          )}
        </form>
      </Modal>

      <Modal
        isOpen={formModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button onClick={closeModal}>close</button>
        <form onSubmit={newEventSubmit}>
          <input
            type="text"
            name="title"
            value={formValue.title}
            onChange={(e) =>
              setFormValue({ ...formValue, title: e.target.value })
            }
          />
          <input
            type="text"
            name="description"
            value={formValue.description}
            onChange={(e) =>
              setFormValue({ ...formValue, description: e.target.value })
            }
          />

          <select
            id="select"
            onChange={(e) =>
              setFormValue({ ...formValue, type: e.target.value })
            }
          >
            <option value="once">once</option>
            <option value="monthly">monthly</option>
            <option value="weekly">weekly</option>
          </select>

          {date_select()}
          <input type="submit" />
        </form>
      </Modal>
    </div>
  );
}

export default CalendarPg;
