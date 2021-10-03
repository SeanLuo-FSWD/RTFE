import React, { useState } from "react";
import { INITIAL_EVENTS } from "../../../fakeDb/event-utils";
import CustomUtil from "../../../helpers/CustomUtil";
import _ from "lodash";

const dateCellRender = (date: any, setModal: Function) => {
  const calDate = CustomUtil.formatStringPDT(date._d);

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

      if (calDate >= startDate && calDate <= endDate) {
        return item;
      }
    } else if (ele.type === "monthly") {
      const day = new Date(date).getDate();
      // console.log("000000000000000000000");
      // console.log(ele);

      const has_month = _.filter(ele.days, (d: any) => {
        return d === "month end";
      });

      if (has_month.length != 0) {
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
        // console.log(has_month);
        const month = new Date(date).getMonth();
        const lastDay = CustomUtil.getMonthLastDay(month);
        // console.log("1111111111111111111111");

        if (day == lastDay) {
          // console.log("3333333333333333");
          // console.log(day);
          // console.log(lastDay);
          return item;
        }
      } else {
        for (let i = 0; i < ele.days!.length; i++) {
          // console.log("2222222222222222");
          // console.log(day);
          // console.log(ele.days![i]);

          if (day == ele.days![i]) {
            return item;
          }
        }
      }
    } else {
      const day = new Date(date).getDay();
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
