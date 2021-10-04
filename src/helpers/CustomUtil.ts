class CustomUtil {
  static getMonthLastDay(month: number) {
    const lastDay = new Date(2008, month + 1, 0);
    return lastDay.getDate();
  }

  static isDigitConvertible(value: any) {
    return /^\d+$/.test(value);
  }

  static formatTimelessDate(
    day: Date,
    typeString = false as boolean,
    offset = {
      offsetType: null,
      amount: 0,
    } as any
  ) {
    let year = day.getFullYear();
    let month = day.getMonth();
    let date = day.getDate();

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

    console.log("1111111111111111111111 " + year + " " + month + " " + date);

    let formatDay: any = new Date(year, month, date, 0, 0, 0);

    console.log("formatDay: " + formatDay);

    if (typeString) {
      formatDay = formatDay.toDateString();
    }

    return formatDay;
  }
}

export default CustomUtil;
