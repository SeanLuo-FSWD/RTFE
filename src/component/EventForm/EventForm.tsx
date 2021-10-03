import React, { useEffect, useState } from "react";
import { INITIAL_EVENTS, createEventId } from "../../fakeDb/event-utils";
import CustomUtil from "../../helpers/CustomUtil";
import FormManager from "../helpers/FormManager";
import Once from "./once";
import Reoccuring from "./reoccuring";
import Picker from "react-calendar";
import pickDates from "./pickDates";
import dateHighLight from "./dateHighLight";

const monthArr: any[] = [];
for (let i = 1; i <= 31; i++) {
  monthArr.push(i.toString());
}
monthArr.push("month end");

function EventForm({ payloadProp, closeModalProp }: any) {
  const initialForm = {
    id: null,
    title: null,
    description: null,
    type: "once",
    duration: [],
    days: [],
  };
  const [formValue, setFormValue] = useState(initialForm) as any;

  console.log("payloadProp.event_obj.date " + payloadProp.event_obj.date);

  useEffect(() => {
    dateHighLight(formValue.duration);
  });
  useEffect(() => {
    setFormValue({
      ...formValue,
      duration: [CustomUtil.formatStringPDT(payloadProp.event_obj.date, true)],
    });
  }, []);
  const onFormChange = (values: any) => {
    setFormValue(values);
  };
  const onFormSubmit = () => {
    if (formValue.type === "once") {
      let dates_duration = formValue.duration.map((val: string) => {
        return CustomUtil.formatStringPDT(new Date(val), true);
      });

      setFormValue({
        ...formValue,
        id: createEventId(),
        duration: dates_duration,
      });
    } else {
      setFormValue({
        ...formValue,
        id: createEventId(),
        days: formValue.days,
      });
    }

    console.dir("form values: " + formValue);
    console.log(formValue);

    INITIAL_EVENTS.push(formValue);
    closeModalProp();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formValue);
        onFormSubmit();
        onFormChange(formValue);
      }}
    >
      <div style={{ display: "flex" }}>
        <input
          name="title"
          placeholder="title"
          value={formValue.title}
          type="text"
          onChange={(e) => {
            onFormChange({ ...formValue, title: e.target.value });
          }}
        />
        <textarea
          name="description"
          placeholder="description"
          value={formValue.description}
          onChange={(e) => {
            onFormChange({ ...formValue, description: e.target.value });
          }}
        />
        <select
          id="select"
          onChange={(e) => setFormValue({ ...formValue, type: e.target.value })}
        >
          <option value="once">once</option>
          <option value="monthly">monthly</option>
          <option value="weekly">weekly</option>
        </select>
      </div>

      {formValue.type === "once" ? (
        <div style={{ display: "flex" }}>
          <div>
            <p>
              Start date:{" "}
              {formValue.duration[0] ? (
                <span> {formValue.duration[0]}</span>
              ) : (
                <span> ?</span>
              )}
            </p>
            <div className="pick_start">
              <Picker
                // activeStartDate={payloadProp.event_obj.date}
                defaultActiveStartDate={
                  formValue.duration[0] && new Date(formValue.duration[0])
                }
                //   onChange={(date: any) => pickDates(date, true)}
                onChange={
                  (date: any) => {
                    let new_duration = pickDates(
                      date,
                      [...formValue.duration],
                      true
                    );

                    new_duration &&
                      onFormChange({ ...formValue, duration: new_duration });
                  }
                  // "duration", new_duration
                }
              />
            </div>
          </div>

          <div>
            <p>
              End date:{" "}
              {formValue.duration[1] ? (
                <span> {formValue.duration[1]}</span>
              ) : (
                <span> ?</span>
              )}
            </p>

            <div className="pick_end">
              <Picker
                defaultActiveStartDate={
                  formValue.duration[0] && new Date(formValue.duration[0])
                }
                onChange={
                  (date: any) => {
                    let new_duration = pickDates(
                      date,
                      [...formValue.duration],
                      false
                    );

                    new_duration &&
                      onFormChange({ ...formValue, duration: new_duration });
                  }
                  // "duration", new_duration
                }
              />
            </div>
          </div>
        </div>
      ) : formValue.type === "monthly" ? (
        <div>
          <div style={{ display: "flex" }}>
            days:
            {formValue.days.map((d: any) => {
              return <p>{d},</p>;
            })}
          </div>
          <select
            name="days"
            onChange={(e) => {
              console.log("wtffff-----");

              console.log(formValue.days);

              const new_days = [...formValue.days, parseInt(e.target.value)];
              console.log("zzzzzzzzzzzzzzzzzzzzzzz");
              console.log(new_days);

              setFormValue({ ...formValue, days: new_days });
            }}
          >
            {monthArr.map((day) => {
              return <option key={day}>{day}</option>;
            })}
          </select>
        </div>
      ) : (
        <p>month or weekly</p>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default EventForm;
