class DateClass {
  getISODateStr(strISO: string) {
    let pureDate = strISO.replace(/T.*$/, "");
    let split_arr = pureDate.split("-");
    console.log("ggggggggggggggggggggggg");
    console.log(split_arr);

    let month = new Date().toLocaleString("default", { month: "long" });
    switch (split_arr[1]) {
      case "1":
        month = "January";
        break;
      case "2":
        month = "February";
        break;
      case "3":
        month = "March";
        break;
      case "4":
        month = "April";
        break;
      case "5":
        month = "May";
        break;
      case "6":
        month = "June";
        break;
      case "7":
        month = "July";
        break;
      case "8":
        month = "August";
        break;
      case "9":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "December";
        break;
      default:
        break;
    }

    let dayStrOb = {
      year: split_arr[0],
      month,
      day: split_arr[2],
    };

    return dayStrOb;
  }

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
