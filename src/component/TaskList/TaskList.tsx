import React, { useState, useEffect, useRef } from "react";
import { INITIAL_EVENTS } from "../../fakeDb/event-utils";
import getDaysFromToday from "../../helpers/getDaysFromToday";
import getTasksforDay from "../../helpers/getTasksforDay";
import TaskModal from "../TaskDetail/TaskDetail";
import CustomUtil from "../../helpers/CustomUtil";

const _Modal_initial = {
  type: null as null | string,
  payload: null as any,
};

function TaskList() {
  const [_Modal, set_Modal] = useState(_Modal_initial);
  const closeModal = () => {
    set_Modal(_Modal_initial);
  };

  const setDetailModal = (e: any, event_id: any) => {
    e.stopPropagation();
    for (let i = 0; i < INITIAL_EVENTS.length; i++) {
      if (event_id === INITIAL_EVENTS[i].id) {
        set_Modal({ type: "event", payload: INITIAL_EVENTS[i] });
      }
    }
  };

  const days_arr = getDaysFromToday(30);

  let taskListCompo = days_arr.map((calDate: Date) => {
    let ele_arr = null;

    ele_arr = INITIAL_EVENTS.filter((ele) => {
      return getTasksforDay(calDate, true, ele);
    }).map((ele) => {
      const item = (
        <button onClick={(e) => setDetailModal(e, ele.id)}>{ele.title}</button>
      );

      const hasEvents = getTasksforDay(calDate, item, ele);
      console.dir("eventttt: ");
      console.log(hasEvents);

      return hasEvents;
    });

    const today = CustomUtil.formatTimelessDate(new Date());
    // calDate = CustomUtil.formatTimelessDate(calDate);

    let dateDisplay;

    if (today.getTime() === calDate.getTime()) {
      dateDisplay = "Today";
    } else if (
      today.getTime() ===
      CustomUtil.formatTimelessDate(calDate, false, {
        offsetType: "day",
        amount: -1,
      }).getTime()
    ) {
      dateDisplay = "Tomorrow";
    } else {
      dateDisplay = calDate.toISOString().replace(/T.*$/, "");
    }

    if (ele_arr.length > 0) {
      return (
        <div>
          <h2>{dateDisplay}</h2>
          <div>{ele_arr}</div>
        </div>
      );
    }
  });

  return (
    <div>
      {taskListCompo}

      {_Modal.type && (
        <TaskModal
          isOpenProp={_Modal.type}
          closeModalProp={closeModal}
          payloadProp={{ event_obj: _Modal.payload }}
        />
      )}
    </div>
  );
}

export default TaskList;
