import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../redux/actions";
import "./App.scss";
import SmurfForm from "./SmurfForm";
class App extends Component {
  async componentDidMount() {
    await this.props.fetchData();
  }

  render() {
    return (
      <div className="App">
        <h1>SMURFS! 2.0 W/ Redux</h1>
        <div>Welcome to your state management version of Smurfs!</div>
        <div>Start inside of your `src/index.js` file!</div>
        <div>Have fun!</div>
        <SmurfForm />
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
