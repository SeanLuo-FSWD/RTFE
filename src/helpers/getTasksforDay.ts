import _ from "lodash";
import CustomUtil from "./CustomUtil";

const getTasksforDay = (calDate: any, item = true as any, ele: any) => {
  let startDate;
  let endDate;
  if (ele.type === "once") {
    startDate = new Date(ele.duration![0]);
    endDate = new Date(ele.duration![1]);

    if (calDate >= startDate && calDate <= endDate) {
      return item;
    }
  } else if (ele.type === "monthly") {
    const day = calDate.getDate();

    const has_month = _.filter(ele.days, (d: any) => {
      return d === "month end";
    });

    if (
      has_month.length !== 0 &&
      day == CustomUtil.getMonthLastDay(calDate.getMonth())
    ) {
      return item;
    } else {
      for (let i = 0; i < ele.days!.length; i++) {
        if (day == ele.days![i]) {
          return item;
        }
      }
    }
  } else {
    const day = calDate.getDay();
    for (let i = 0; i < ele.days!.length; i++) {
      if (day === ele.days![i]) {
        return item;
      }
    }
  }
};

export default getTasksforDay;
