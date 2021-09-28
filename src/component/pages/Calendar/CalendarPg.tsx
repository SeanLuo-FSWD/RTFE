import React, { useState, useEffect, useRef } from "react";
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

  greyout: {
    backgroundColor: "lightgrey",
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

let date_click = false;
let add_click_once = false;

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function CalendarPg() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formModalIsOpen, setIsFormOpen] = useState(false);
  const [formValue, setFormValue] = useState(initialForm) as any;
  const [forceUpdate, setForceUpdate] = useState(false);
  // const prevFormValue = usePrevious(formValue);

  useEffect(() => {
    console.log("fires first time, but not after");

    colorMainCal();
    date_click = false;
  });

  useEffect(() => {
    if (formModalIsOpen) {
      let dates_arr: any[] = [];
      formValue.duration.forEach((e: string) => {
        dates_arr.push(
          new Date(e + " 00:00:00 GMT-0700 (Pacific Daylight Time)")
        );
      });

      dateHighlight(dates_arr);
    }
  }, [formValue.duration, forceUpdate]);

  useEffect(() => {
    console.log("eeeeeeeeeeeeeeeeeeeeee");
    console.log("eeeeeeeeeeeeeeeeeeeeee");
    console.log(add_click_once);

    let main_cal_selectors = document.querySelectorAll(".ant-select-selector");

    main_cal_selectors.forEach((each) => {
      if (!add_click_once) {
        each.addEventListener("click", () => {
          console.log("addded");

          let main_cal_dps = document.querySelectorAll(".ant-select-dropdown");
          main_cal_dps.forEach((each) => {
            each.addEventListener("click", () => {
              console.log("forceeeeeeed update");
              setForceUpdate(!forceUpdate);
            });
          });
        });
      }
    });
    add_click_once = true;
  }, []);

  const colorMainCal = () => {
    // if (prevFormValue !== formValue) {
    let clickable = document.querySelector(".ant-picker-content tbody");

    let date_cells = clickable?.querySelectorAll(
      ".ant-picker-cell .ant-picker-calendar-date"
    ) as any;

    date_cells?.forEach((each: any) => {
      // console.log("vvvvvvvvvvvvvvvvvvv");
      // console.log(new Date(each.parentElement.getAttribute("title")));
      // console.log(getTodayPDT(24));
      // console.log("vvvvvvvvvvvvvvvvvvv");

      if (
        new Date(each.parentElement.getAttribute("title")) <= getTodayPDT(-17)
      ) {
        each.style.backgroundColor = "lightgrey";
      } else {
        each.style.backgroundColor = "white";
      }
    });
  };

  function getTodayPDT(hour_offset?: number) {
    let today = new Date(
      new Date().toLocaleDateString("en-US", { timeZone: "PST" })
    );
    if (hour_offset) {
      today.setHours(today.getHours() + hour_offset);
    }
    return today;
  }

  const afterOpenFormModal = () => {
    console.log(formValue.duration[0]);
    const d = new Date(
      formValue.duration[0] + " 00:00:00 GMT-0700 (Pacific Daylight Time)"
    );

    let query_target = `${d.toLocaleString("default", {
      month: "long",
    })} ${d.getDate()}, ${d.getFullYear()}`;

    let date_aria = document.querySelector(`[aria-label="${query_target}"]`);
    if (date_aria) {
      date_aria.parentElement?.click();
    }

    let old_elements = document.querySelectorAll(".react-calendar__tile");

    old_elements.forEach((old_ele: any) => {
      const abbr = old_ele.querySelector("abbr");

      if (abbr) {
        let aria_label = abbr.getAttribute("aria-label");

        if (aria_label) {
          let date = new Date(aria_label);

          if (date < getTodayPDT()) {
            old_ele.addEventListener("click", function (e: any) {
              console.log("no click possible");

              e.stopPropagation();
            });

            old_ele.style.backgroundColor = "lightgrey";
          }
        }
      }
    });
  };

  const dateHighlight = (dates: any[]) => {
    // let date = new Date(
    //   "Sep 19 2021 00:00:00 GMT-0700 (Pacific Daylight Time)"
    // );

    let previous_actives = document.querySelectorAll(
      ".react-calendar__tile--active"
    );

    previous_actives &&
      previous_actives.forEach((each) => {
        each.classList.remove("react-calendar__tile--active");
      });

    {
      dates[0] && color(dates[0], "pick_start");
    }
    {
      dates[1] && color(dates[1], "pick_end");
    }

    // return query_target;
  };

  const color = (date: Date, target_class: string) => {
    console.log("target_class");
    console.log(target_class);

    let query_target1 = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getDate()}, ${date.getFullYear()}`;

    let date_aria1 = document.querySelector(
      `.${target_class} [aria-label="${query_target1}"]`
    );
    if (date_aria1) {
      date_aria1.parentElement?.classList.add("react-calendar__tile--active");
    }
  };

  const date_select = () => {
    switch (formValue.type) {
      case "once":
        return (
          <>
            <p>Pick start and end date</p>

            <div style={{ display: "flex" }}>
              <div>
                <p>
                  Start date:{" "}
                  {formValue.duration[0] ? (
                    <span> {formValue.duration[0]}</span>
                  ) : (
                    <span> ?</span>
                  )}
                </p>
                <div className="pick_start">
                  <Picker
                    defaultActiveStartDate={new Date(formValue.duration[0])}
                    onChange={(date: any) => pickDates(date, true)}
                  />
                </div>
              </div>

              <div>
                <p>
                  End date:{" "}
                  {formValue.duration[1] ? (
                    <span> {formValue.duration[1]}</span>
                  ) : (
                    <span> ?</span>
                  )}
                </p>
                <div className="pick_end">
                  <Picker
                    defaultActiveStartDate={new Date(formValue.duration[0])}
                    onChange={(date: any) => pickDates(date, false)}
                  />
                </div>
              </div>
            </div>
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

  const pickDates = (date: any, start: boolean) => {
    console.log("88888888888888888888");
    console.log(formValue.duration);

    let new_duration = [...formValue.duration];
    const date_str = date.toISOString().replace(/T.*$/, "");
    if (start) {
      new_duration[0] = date_str;
    } else {
      new_duration[1] = date_str;
    }

    console.log("999999999999999999999");
    console.log(formValue.duration);

    if (new Date(new_duration[0]) > new Date(new_duration[1])) {
      window.alert("Start date is later than end date!");
      console.log("formvalue.duration__");
      console.log(formValue.duration);

      setForceUpdate(!forceUpdate);
    } else {
      console.log("?????????????????");
      console.log("new_duration");
      console.log(new_duration);

      setFormValue({
        ...formValue,
        duration: new_duration,
      });
    }

    //   dates_record.push(date_str);
    // dates_record = dates_record.splice(-2);

    // let new_duration = dates_record.sort((a: any, b: any) => {
    //   const dateA = new Date(a);
    //   const dateB = new Date(b);
    //   return dateA.valueOf() - dateB.valueOf();
    // });
  };

  const newEventSubmit = (e: any) => {
    e.preventDefault();
    const newFormValue = {
      ...formValue,
      duration: [
        formValue.duration[0] + " 00:00:00 GMT-0700 (Pacific Daylight Time)",
        formValue.duration[1] + " 24:00:00 GMT-0700 (Pacific Daylight Time)",
      ],
    };

    INITIAL_EVENTS.push(newFormValue);
    setFormValue(initialForm);
    closeModal();
  };
  function closeModal() {
    console.log("closemodallll calleeddd");

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
    console.log("============");
    // console.log(date_click);

    if (date_click) {
      let clickedDay = new Date(date);

      // if (clickedDay > new Date()) {
      if (clickedDay > getTodayPDT()) {
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

        console.log("nopenopenopenopenopenope");

        setFormValue({
          ...formValue,
          duration: [formatDay],
        });
        setIsFormOpen(true);
      }
    }
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
  };

  return (
    <div id="calendarPg">
      <Calendar
        onSelect={(date) => onSelect(date)}
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

          {event_data.duration && (
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
        onAfterOpen={afterOpenFormModal}
      >
        <button onClick={closeModal}>close</button>
        <form onSubmit={newEventSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formValue.title}
            onChange={(e) =>
              setFormValue({ ...formValue, title: e.target.value })
            }
          />
          <label>Description</label>
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
