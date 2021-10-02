import React, { useEffect, useState } from "react";
import { INITIAL_EVENTS, createEventId } from "../../fakeDb/event-utils";
import DateClass from "../../helpers/DateClass";
import FormManager from "../helpers/FormManager";
import Once from "./once";
import Reoccuring from "./reoccuring";

function EventForm({ payloadProp, closeModalProp }: any) {
  let dateObj = new DateClass();
  const initialForm = {
    id: null,
    title: null,
    description: null,
    type: "once",
    duration: [],
  };
  const [formValue, setFormValue] = useState(initialForm) as any;

  useEffect(() => {
    setFormValue({
      ...formValue,
      duration: [dateObj.formatStringPDT(payloadProp.event_obj.date, true)],
    });
  }, []);
  const onFormChange = (values: any) => {
    setFormValue(values);
  };
  const onSubmitOnce = () => {
    let dates_duration = formValue.duration.map((val: string) => {
      return dateObj.formatStringPDT(new Date(val), true);
    });

    setFormValue({
      ...formValue,
      id: createEventId(),
      duration: dates_duration,
      type: "once",
    });

    console.log("form values");
    console.log(formValue);

    INITIAL_EVENTS.push(formValue);
    closeModalProp();
  };

  return formValue.type === "once" ? (
    <Once
      payloadProp={payloadProp}
      formValue={formValue}
      onSubmit={onSubmitOnce}
      onFormChange={(values: any) => onFormChange(values)}
    />
  ) : (
    <Reoccuring />
  );
}

export default EventForm;
