import React from "react";
import FormManager from "../helpers/FormManager";
import Picker from "react-calendar";

const initialValues = { title: "", description: "", duration: [] };

const pickDates = (date: Date, duration: any, start: boolean) => {
  console.log("pickDates");

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

function Once({ payloadProp, onSubmit }: any) {
  return (
    <FormManager initialValues={initialValues}>
      {({ values, setValues }: any) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(values);
            onSubmit(values);
            setValues(initialValues);
          }}
        >
          <input
            name="title"
            placeholder="title"
            value={values.title}
            type="text"
            onChange={(e) => {
              setValues({ ...values, title: e.target.value });
            }}
          />
          <textarea
            name="description"
            placeholder="description"
            value={values.description}
            onChange={(e) => {
              setValues({ ...values, description: e.target.value });
            }}
          />
          <div style={{ display: "flex" }}>
            <div>
              <p>
                Start date:{" "}
                {values.duration[0] ? (
                  <span> {values.duration[0]}</span>
                ) : (
                  <span> ?</span>
                )}
              </p>
              <Picker
                defaultActiveStartDate={payloadProp.date}
                //   onChange={(date: any) => pickDates(date, true)}
                onChange={
                  (date: any) => {
                    let new_duration = pickDates(
                      date,
                      [...values.duration],
                      true
                    );

                    new_duration &&
                      setValues({ ...values, duration: new_duration });
                  }
                  // "duration", new_duration
                }
              />
            </div>

            <div>
              <p>
                End date:{" "}
                {values.duration[1] ? (
                  <span> {values.duration[1]}</span>
                ) : (
                  <span> ?</span>
                )}
              </p>

              <Picker
                defaultActiveStartDate={payloadProp.date}
                //   onChange={(date: any) => pickDates(date, true)}
                onChange={
                  (date: any) => {
                    let new_duration = pickDates(
                      date,
                      [...values.duration],
                      false
                    );

                    new_duration &&
                      setValues({ ...values, duration: new_duration });
                  }
                  // "duration", new_duration
                }
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </FormManager>
  );
}

export default Once;
