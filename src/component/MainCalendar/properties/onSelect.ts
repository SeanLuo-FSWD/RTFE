import DateClass from "../../../helpers/DateClass";

const onSelect = (date: any, setFormModal: any) => {
  console.log("onSelect");

  let clickedDay = new Date(date);
  const DateObj = new DateClass();

  setFormModal(clickedDay);
};

export default onSelect;
