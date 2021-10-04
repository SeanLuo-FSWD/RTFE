import React, { useState } from "react";
import { INITIAL_EVENTS } from "../../../fakeDb/event-utils";
import CustomUtil from "../../../helpers/CustomUtil";
import _ from "lodash";
import getTasksforDay from "../../../helpers/getTasksforDay";

const dateCellRender = (date: any, setModal: Function) => {
  console.log("000000000000000000000");
  // console.log("date._d.toDateString() " + date._d.toDateString());
  console.log(
    "date._d.toDateString() " + date._d.toISOString().replace(/T.*$/, "")
  );
  // date._d.toDateString() 2021-11-28
  const calDate = CustomUtil.formatTimelessDate(
    date._d.toDateString()
  );
  console.log("calDate " + calDate);

  //calDate Sat Nov 27 2021 00:00:00 GMT-0800 (Pacific Standard Time)

  let ele_arr = null;

  ele_arr = INITIAL_EVENTS.map((ele) => {
    const item = (
      <button onClick={(e) => setModal(e, ele.id)}>{ele.title}</button>
    );

    return getTasksforDay(calDate, item, ele);
  });

  return ele_arr;
};

export default dateCellRender;
