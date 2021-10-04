import CustomUtil from "../../../helpers/CustomUtil";

const dateObj = new CustomUtil();

const colorMainCal = () => {
  let clickable = document.querySelector(".ant-picker-content tbody");

  let date_cells = clickable?.querySelectorAll(
    ".ant-picker-cell .ant-picker-calendar-date"
  ) as any;

  date_cells?.forEach((each: any) => {
    const cell_date = CustomUtil.formatTimelessDate(
      each.parentElement.getAttribute("title")
    );

    const today = CustomUtil.formatTimelessDate(
      new Date().toDateString(),
      false
    );

    if (cell_date.getTime() < today.getTime()) {
      // console.log("today as per formatDate === " + today);
      each.style.backgroundColor = "lightgrey";
    } else {
      each.style.backgroundColor = "white";
    }
  });
};

export default colorMainCal;
