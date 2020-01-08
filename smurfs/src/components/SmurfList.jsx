import React from "react";
import { connect } from "react-redux";
import { deleteData, updateData, updateRequest } from "../redux/actions";

function SmurfList(props) {
  return (
    <div className="container col-sm-12 col-md-8 table-responsive mb-4">
      <h3 className="font-weight-bold text-uppercase text-primary">
        Smurf List
      </h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Height</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((smurf, index) => (
            <tr key={smurf.id}>
              <th scope="row">{index + 1}</th>
              <td>{smurf.name}</td>
              <td>{`${smurf.age} years old`}</td>
              <td>{`${smurf.height}cm`}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm md-mr-2 mr-sm-1 mb-2 mb-sm-0"
                  onClick={() => props.updateRequest(smurf)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm md-ml-2 ml-sm-1"
                  onClick={() => props.deleteData(smurf.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
