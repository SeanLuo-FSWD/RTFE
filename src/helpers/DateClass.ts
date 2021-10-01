class DateClass {
  // getTodayNoTime(stringType: boolean) {
  //   // let todayStr = new Date().toISOString().replace(/T.*$/, "");
  //   let todayStr = new Date();
  //   todayStr.setHours(todayStr.getHours() - 7);

  //   let today: Date | String = new Date(new Date().toDateString());

  //   if (stringType) {
  //     today = today.toDateString();
  //   }

  //   return today;
  // }

  formatStringPDT(day: Date, typeString = true as boolean) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(day);

    let formatDay: Date | string =
      new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0)
        .toISOString()
        .replace(/T.*$/, "") + " 00:00:00 GMT-0700 (Pacific Daylight Time)";

    if (!typeString) {
      formatDay = new Date(formatDay);
    }

    return formatDay;
  }
}

export default DateClass;
