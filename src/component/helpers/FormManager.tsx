import { useState } from "react";

export default function FormManager({ initialValues, children }: any) {
  const [values, setValues] = useState({ ...initialValues });

  return children({
    values,
    setValues,
  });
}
