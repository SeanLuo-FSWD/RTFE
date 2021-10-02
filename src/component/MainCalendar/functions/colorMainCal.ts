import DateClass from "../../../helpers/DateClass";

const dateObj = new DateClass();

const colorMainCal = () => {
  let clickable = document.querySelector(".ant-picker-content tbody");

  let date_cells = clickable?.querySelectorAll(
    ".ant-picker-cell .ant-picker-calendar-date"
  ) as any;

  date_cells?.forEach((each: any) => {
    const cell_date = dateObj.formatStringPDT(
      new Date(each.parentElement.getAttribute("title"))
    );

    const today = dateObj.formatStringPDT(new Date(), undefined, { date: -1 });

    console.log("666666666666666666");
    console.log(cell_date);
    console.log(today);

    if (cell_date.getTime() < today.getTime()) {
      each.style.backgroundColor = "lightgrey";
    } else {
      each.style.backgroundColor = "white";
    }
  });
};

export default colorMainCal;
