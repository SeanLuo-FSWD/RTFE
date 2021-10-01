import React, { useState } from "react";
import { INITIAL_EVENTS } from "../../../fakeDb/event-utils";
import DateClass from "../../../helpers/DateClass";

const dateCellRender = (date: any, setModal: Function) => {
  let dateObj = new DateClass();

  const calDate = dateObj.formatStringPDT(date._d, false);

  let ele_arr = null;

  ele_arr = INITIAL_EVENTS.map((ele) => {
    let startDate;
    let endDate;
    const item = (
      <button onClick={(e) => setModal(e, ele.id)}>{ele.title}</button>
    );

    if (ele.type === "once") {
      startDate = new Date(ele.duration![0]);
      endDate = new Date(ele.duration![1]);
      console.log("calDate: " + calDate);

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

export default dateCellRender;
