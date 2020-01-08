import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../redux/actions";
import "./App.scss";
import SmurfForm from "./SmurfForm";
import SmurfList from "./SmurfList";
class App extends Component {
  async componentDidMount() {
    await this.props.fetchData();
  }

  render() {
    return (
      <div className="App py-4">
        <h1 className="text-primary">SMURFS! 2.0 W/ Redux</h1>
        <p className="col-sm-6 mx-auto">
          React CRUD App using Redux for State Management, Axios, Formik Forms
          with Yup Validation, and Bootstrap styling.
        </p>

        {this.props.state.error ? <p>{this.props.state.error}</p> : null}
        <SmurfForm />
        <SmurfList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
