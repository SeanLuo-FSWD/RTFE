import React, { useEffect } from "react";
import FormManager from "../helpers/FormManager";
import Picker from "react-calendar";
import dateHighLight from "./dateHighLight";

const initialValues = { title: "", description: "", duration: [] };

const pickDates = (date: Date, duration: any, start: boolean) => {
  console.log("pickDates");
  console.log("xxxxxxxxxxxxxxxxxxxxxx");
  let new_duration = duration;
  const date_str = date.toDateString();

  start ? (new_duration[0] = date_str) : (new_duration[1] = date_str);

  if (new Date(new_duration[0]) > new Date(new_duration[1])) {
    window.alert("Start date is later than end date!");
  } else {
    console.log("new_duration");
    console.log(new_duration);

    return new_duration;
  }
  return;
};

function Once({ payloadProp, onSubmit, formValue, onFormChange }: any) {
  console.log("999999999999999999999");
  console.log(payloadProp.event_obj.date);
  console.log(formValue.duration);

  useEffect(() => {
    dateHighLight(formValue.duration);
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formValue);
        onSubmit(formValue);
        onFormChange(formValue);
      }}
    >
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
          <Picker
            activeStartDate={payloadProp.event_obj.date}
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

        <div>
          <p>
            End date:{" "}
            {formValue.duration[1] ? (
              <span> {formValue.duration[1]}</span>
            ) : (
              <span> ?</span>
            )}
          </p>

          <Picker
            defaultActiveStartDate={payloadProp.event_obj.date}
            //   onChange={(date: any) => pickDates(date, true)}
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default Once;
