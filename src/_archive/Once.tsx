function Once({ payloadProp, onSubmit }: any) {
  console.log("999999999999999999999");
  console.log(payloadProp.event_obj.date);

  useEffect(() => {
    dateHighLight(dates_arr);
  });

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
                activeStartDate={payloadProp.event_obj.date}
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
                defaultActiveStartDate={payloadProp.event_obj.date}
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
