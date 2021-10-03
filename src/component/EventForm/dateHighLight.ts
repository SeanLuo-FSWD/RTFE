import CustomUtil from "../../helpers/CustomUtil";

const dateObj = new CustomUtil();

const color = (dateStr: string, target_class: string) => {
  console.log("dateStr");

  console.log(dateStr);

  //   let date = dateObj.getISODateStr(dateStr);
  let d = new Date(dateStr);

  //   let query_target = `${date.month} ${date.day}, ${date.year}`;

  let query_target = `${d.toLocaleString("default", {
    month: "long",
  })} ${d.getUTCDate()}, ${d.getFullYear()}`;

  console.log("sssssssssssssssssssssssss");
  console.log(query_target);
  let date_aria1 = document.querySelector(
    `.${target_class} [aria-label="${query_target}"]`
  );
  if (date_aria1) {
    date_aria1.parentElement?.classList.add("react-calendar__tile--active");
  }
};

const dateHighLight = (dates: string[]) => {
  let previous_actives = document.querySelectorAll(
    ".react-calendar__tile--active"
  );

  previous_actives &&
    previous_actives.forEach((each) => {
      each.classList.remove("react-calendar__tile--active");
    });

  {
    dates[0] && color(dates[0], "pick_start");
  }
  {
    dates[1] && color(dates[1], "pick_end");
  }
};

export default dateHighLight;
