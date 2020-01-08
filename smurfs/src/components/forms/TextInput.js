import React from "react";
import { useField } from "formik";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className="form-group col-md-4">
      <label htmlFor={props.id || props.name} className="text-primary">
        {label}
      </label>
      <input className="text-input form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyTextInput;
