import React, { useEffect, useState } from "react";
import { INITIAL_EVENTS, createEventId } from "../../fakeDb/event-utils";
import DateClass from "../../helpers/DateClass";
import FormManager from "../helpers/FormManager";
import Once from "./once";
import Reoccuring from "./reoccuring";

function EventForm({ payloadProp, closeModalProp }: any) {
  let dateObj = new DateClass();
  const [_eventType, set_eventType] = useState("once");

  const onSubmitOnce = (values: any) => {
    let dates_duration = values.duration.map((val: string) => {
      return dateObj.formatStringPDT(new Date(val));
    });

    values = {
      ...values,
      id: createEventId(),
      duration: dates_duration,
      type: "once",
    };

    console.log("form values");
    console.log(values);

    INITIAL_EVENTS.push(values);
    closeModalProp();
  };

  return _eventType === "once" ? (
    <Once payloadProp={payloadProp} onSubmit={onSubmitOnce} />
  ) : (
    <Reoccuring />
  );
}

export default EventForm;
