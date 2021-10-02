class DateClass {
  // getTodayNoTime(stringType: boolean) {
  //   // let todayStr = new Date().toISOString().replace(/T.*$/, "");
  //   let today = new Date();
  //   let formatDay: Date | string =
  //     new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  //       .toISOString()
  //       .replace(/T.*$/, "") + " 00:00:00 GMT-0700 (Pacific Daylight Time)";

  //   todayStr.setHours(todayStr.getHours() - 7);

  //   let today: Date | String = new Date(new Date().toDateString());

  //   if (stringType) {
  //     today = today.toDateString();
  //   }

  //   return today;
  // }

  formatStringPDT(
    day: Date,
    typeString = false as boolean,
    offset = null as any
  ) {
    let year = day.getFullYear();
    let month = day.getMonth();
    let date = day.getDate();

    if (offset) {
      const offsetType = Object.keys(offset)[0];
      switch (offsetType) {
        case "year":
          year = year + offset[offsetType];
          break;
        case "month":
          month = month + offset[offsetType];
          break;
        case "date":
          date = date + offset[offsetType];
          break;
        default:
          break;
      }
    }

    let formatDay: any =
      new Date(year, month, date, 0, 0, 0).toISOString().replace(/T.*$/, "") +
      " 00:00:00 GMT-0700 (Pacific Daylight Time)";

    if (!typeString) {
      formatDay = new Date(formatDay);
    }

    return formatDay;
  }
}

export default DateClass;
