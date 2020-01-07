import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./forms/TextInput";
import { postData, updateData } from "../redux/actions/";

function SmurfForm(props) {
  useEffect(() => {
    console.log("STATE", props.data);
    console.log("UPDATING", props.updating);
  }, [props.data, props.updating]);

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name: props.updating.name || "",
          age: props.updating.age || 0,
          height: props.updating.height || ""
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
        onSubmit={async (
          values,
          { setSubmitting, setErrors, setStatus, resetForm }
        ) => {
          try {
            if (!props.updating) {
              await props.postData(values);
            } else {
              await props.updateData(props.updating, values);
            }
            console.log(values);
            resetForm({});
            setStatus({ success: true });
          } catch (error) {
            setStatus({ success: false });
            setSubmitting(false);
            setErrors({ submit: error.message });
          }
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
          <button type="submit">
            {props.updating.name ? "Update" : "Submit"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.data,
    updating: state.updating
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postData: payload => dispatch(postData(payload)),
    updateData: (oldUser, user) => dispatch(updateData(oldUser, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SmurfForm);
