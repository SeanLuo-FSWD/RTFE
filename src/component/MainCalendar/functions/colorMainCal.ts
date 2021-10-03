import CustomUtil from "../../../helpers/CustomUtil";

const dateObj = new CustomUtil();

const colorMainCal = () => {
  let clickable = document.querySelector(".ant-picker-content tbody");

  let date_cells = clickable?.querySelectorAll(
    ".ant-picker-cell .ant-picker-calendar-date"
  ) as any;

  date_cells?.forEach((each: any) => {
    const cell_date = CustomUtil.formatStringPDT(
      new Date(each.parentElement.getAttribute("title"))
    );

    const today = CustomUtil.formatStringPDT(new Date(), undefined, {
      date: -1,
    });

    if (cell_date.getTime() < today.getTime()) {
      each.style.backgroundColor = "lightgrey";
    } else {
      each.style.backgroundColor = "white";
    }
  });
};

export default colorMainCal;
