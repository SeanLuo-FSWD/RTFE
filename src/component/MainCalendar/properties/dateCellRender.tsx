import React, { useState } from "react";
import { INITIAL_EVENTS } from "../../../fakeDb/event-utils";
import CustomUtil from "../../../helpers/CustomUtil";
import _ from "lodash";
import getTasksforDay from "../../../helpers/getTasksforDay";

const dateCellRender = (date: any, setModal: Function) => {
  const calDate = CustomUtil.formatTimelessDate(date._d);

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
