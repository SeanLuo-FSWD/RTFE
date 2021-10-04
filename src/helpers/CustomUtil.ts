class CustomUtil {
  static getMonthLastDay(month: number) {
    const lastDay = new Date(2008, month + 1, 0);
    return lastDay.getDate();
  }

  static isDigitConvertible(value: any) {
    return /^\d+$/.test(value);
  }

  static formatTimelessDate(
    day: String,
    typeString = false as boolean,
    offset = {
      offsetType: null,
      amount: 0,
    } as any
  ) {
    let dayPDT = new Date(day + " 01:00:00 GMT-0700 (Pacific Daylight Time)");
    let year = dayPDT.getFullYear();
    let month = dayPDT.getMonth();
    let date = dayPDT.getDate();

    if (offset.offsetType) {
      // const offsetType = Object.keys(offset)[0];
      switch (offset.offsetType) {
        case "year":
          year = year + offset.amount;
          break;
        case "month":
          month = month + offset.amount;
          break;
        case "day":
          date = date + offset.amount;
          break;
        default:
          break;
      }
    }

    // let formatDay: any =
    //   new Date(year, month, date, 0, 0, 0).toISOString().replace(/T.*$/, "") +
    //   " 00:00:00 GMT-0700 (Pacific Daylight Time)";

    let formatDay: any = new Date(year, month, date, 0, 0, 0);

    if (typeString) {
      formatDay = formatDay.toDateString();
    }

    return formatDay;
  }
}

export default CustomUtil;
