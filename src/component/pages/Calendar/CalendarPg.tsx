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
  duration: [],
};

function CalendarPg() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formModalIsOpen, setIsFormOpen] = useState(false);
  const [formValue, setFormValue] = useState(initialForm) as any;
  console.log("000000000000000000000");
  console.log("000000000000000000000");
  console.log(formValue.duration);

  let dates_record: any = formValue.duration;

  // useEffect(() => {
  //   // console.log('formValue');
  //   // console.log(formValue);

  // });

  const date_select = () => {
    switch (formValue.type) {
      case "once":
        return (
          <>
            <p>Pick start and end date</p>
            <p>
              Start date:{" "}
              {formValue.duration[0] ? (
                <span> {formValue.duration[0]}</span>
              ) : (
                <span> ?</span>
              )}
            </p>

            <p>
              End date:{" "}
              {formValue.duration[1] ? (
                <span> {formValue.duration[1]}</span>
              ) : (
                <span> ?</span>
              )}
            </p>

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
    const date_str = date.toISOString().replace(/T.*$/, "");
    console.log("why is this a number?");
    console.log(dates_record);

    dates_record.push(date_str);
    dates_record = dates_record.splice(-2);
    console.log("dates_record");
    console.log(dates_record);

    let new_duration = dates_record.sort((a: any, b: any) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.valueOf() - dateB.valueOf();
    });

    console.log("new duration ;)");
    // new_duration = [
    //   new_duration[0] + " 00:00:00 GMT-0700 (Pacific Daylight Time)",
    //   new_duration[1] + " 24:00:00 GMT-0700 (Pacific Daylight Time)",
    // ];
    console.log(new_duration);

    setFormValue({
      ...formValue,
      duration: new_duration,
    });
  };

  const newEventSubmit = (e: any) => {
    e.preventDefault();

    // console.log("formValue.duration[1] formValue.duration[1] ");
    // console.dir(formValue);

    // let date = new Date(formValue.duration[1]).setHours(24, 0, 0, 0);
    // let fixed_date = new Date(date);

    // console.log(
    //   "corrected_end_date corrected_end_date corrected_end_date: " + fixed_date
    // );

    console.log("55555555555555555");
    console.log(formValue.duration);

    const newFormValue = {
      ...formValue,
      duration: [
        formValue.duration[0] + " 00:00:00 GMT-0700 (Pacific Daylight Time)",
        formValue.duration[1] + " 24:00:00 GMT-0700 (Pacific Daylight Time)",
      ],
    };

    // INITIAL_EVENTS.push(formValue);
    INITIAL_EVENTS.push(newFormValue);
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
    )
      .toISOString()
      .replace(/T.*$/, "");

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
