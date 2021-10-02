const color = (dateObj: Date, target_class: string) => {
  let date = new Date(dateObj);
  let query_target1 = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;

  let date_aria1 = document.querySelector(
    `.${target_class} [aria-label="${query_target1}"]`
  );
  if (date_aria1) {
    date_aria1.parentElement?.classList.add("react-calendar__tile--active");
  }
};

const dateHighLight = (dates: any[]) => {
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
