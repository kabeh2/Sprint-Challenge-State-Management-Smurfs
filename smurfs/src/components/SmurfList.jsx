import React from "react";
import { connect } from "react-redux";
import { deleteData, updateData, updateRequest } from "../redux/actions";

function SmurfList(props) {
  return (
    <div>
      {props.data.map(smurf => (
        <div key={smurf.id}>
          {`${smurf.name} - ${smurf.age} years old - ${smurf.height}cm`}
          <button onClick={() => props.updateRequest(smurf)}>Update</button>
          <button onClick={() => props.deleteData(smurf.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteData: id => dispatch(deleteData(id)),
    updateData: user => dispatch(updateData(user)),
    updateRequest: user => dispatch(updateRequest(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SmurfList);
