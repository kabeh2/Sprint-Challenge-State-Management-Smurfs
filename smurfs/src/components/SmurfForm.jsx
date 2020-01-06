import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./forms/TextInput";

function SmurfForm() {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          age: 0,
          height: ""
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          age: Yup.number()
            .moreThan(0, "Must be at least 1 years old")
            .required("Required"),
          height: Yup.number()
            .max(20, "No smurf is that tall")
            .required("Required")
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <TextInput
            label="Full Name"
            name="name"
            type="text"
            placeholder="Write Full Name Here..."
          />
          <TextInput
            label="Age"
            name="age"
            type="text"
            placeholder="Write Age Here..."
          />
          <TextInput
            label="Height in cm"
            name="height"
            type="text"
            placeholder="Write Value of Height Here Only..."
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SmurfForm;
