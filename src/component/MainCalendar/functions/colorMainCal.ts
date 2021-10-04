import CustomUtil from "../../../helpers/CustomUtil";

const dateObj = new CustomUtil();

const colorMainCal = () => {
  let clickable = document.querySelector(".ant-picker-content tbody");

  let date_cells = clickable?.querySelectorAll(
    ".ant-picker-cell .ant-picker-calendar-date"
  ) as any;

  date_cells?.forEach((each: any) => {
    const cell_date = CustomUtil.formatTimelessDate(
      new Date(each.parentElement.getAttribute("title"))
    );

    const today = CustomUtil.formatTimelessDate(new Date(), false);

    if (cell_date.getTime() < today.getTime()) {
      // console.log("today as per formatDate === " + today);

      console.log(
        " 2222222222222222 as per caldate " +
          each.parentElement.getAttribute("title")
      );

      console.log("celldate " + cell_date);
      each.style.backgroundColor = "lightgrey";
    } else {
      each.style.backgroundColor = "white";
    }
  });
};

export default colorMainCal;
