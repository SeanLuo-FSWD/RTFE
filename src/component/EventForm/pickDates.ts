import CustomUtil from "../../helpers/CustomUtil";

const dateObj = new CustomUtil();

const pickDates = (date: Date, duration: any, start: boolean) => {
  let new_duration = duration;

  const date_str = CustomUtil.formatTimelessDate(date.toDateString(), true);

  start ? (new_duration[0] = date_str) : (new_duration[1] = date_str);

  if (new Date(new_duration[0]) > new Date(new_duration[1])) {
    window.alert("Start date is later than end date!");
  } else {
    console.log("date_str date_str date_str");
    console.log(date_str);

    return new_duration;
  }
  return;
};

export default pickDates;
