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
    <div className="container card col-10 col-md-8 my-4 p-4">
      <h3 className="font-weight-bold text-uppercase text-primary">
        {props.updating.name ? "Update Smurf" : "Add Smurf"}
      </h3>
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
            .moreThan(0.999999999, "Must be at least 1 years old")
            .round()
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
            props.updating.name
              ? await props.updateData(props.updating, values)
              : await props.postData(values);

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
        <Form className="d-flex flex-wrap justify-content-center text-left">
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
          <button
            type="submit"
            className="btn btn-outline-primary mx-3 justify-self-around"
          >
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
