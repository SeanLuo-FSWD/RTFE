import React, { useEffect } from "react";
import FormManager from "../helpers/FormManager";
import Picker from "react-calendar";
import dateHighLight from "./dateHighLight";
import CustomUtil from "../../helpers/CustomUtil";

function Once({ payloadProp, onSubmit, formValue, onFormChange }: any) {
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default Once;
