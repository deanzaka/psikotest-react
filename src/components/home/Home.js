import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../header/Header";

class Home extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        Hello {this.props.user ? this.props.user.name : "stranger"}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user,
});

export default connect(mapStateToProps)(Home);
