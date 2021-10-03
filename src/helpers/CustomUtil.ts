class CustomUtil {
  static getMonthLastDay(month: number) {
    const lastDay = new Date(2008, month + 1, 0);
    return lastDay.getDate();
  }

  static isDigitConvertible(value: any) {
    return /^\d+$/.test(value);
  }

  static formatStringPDT(
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

export default CustomUtil;
