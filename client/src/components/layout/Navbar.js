import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

import Logo from "../../img/logo.png";

class Navbar extends Component {
  // Modal
  state = {
    modalIsOpen: false
  };
  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  toggleModal2() {
    this.setState({
      modalIsOpen2: !this.state.modalIsOpen2
    });
  }

  // Logout

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" onClick={this.toggleModal.bind(this)}>
            <i className="icofont-paper" /> Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={this.toggleModal2.bind(this)}>
            <i className="icofont-login" /> Login
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/driver" className="nav-link">
            <i className="icofont-tick-boxed" /> Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link onClick={this.onLogoutClick.bind(this)} className="nav-link">
            <i className="icofont-logout" /> Logout
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar1"
            aria-controls="navbar1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="logo" />
          </Link>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <i className="icofont-facebook text-primary" />{" "}
              <i className="icofont-twitter text-primary" />{" "}
              <i className="icofont-instagram text-primary" />
            </li>
          </ul>

          <div
            className="collapse navbar-collapse justify-content-md-center"
            id="navbar1"
          >
            <ul className="navbar-nav ml-auto">
              <Link to="/driver" className="nav-link">
                <i className="icofont-home" /> Home
              </Link>
              {isAuthenticated ? userLink : loginRegLink}
            </ul>
          </div>

          <Modal isOpen={this.state.modalIsOpen} centered>
            <ModalHeader toggle={this.toggleModal.bind(this)}>
              <h4>
                <i className="icofont-paper" /> Sign Up
              </h4>
            </ModalHeader>
            <ModalBody>
              <h5>Create your account.</h5>
              <p>Fill out the form carefully for registration.</p>
              <Link
                to={"/registeruser"}
                className="btn btn-primary btn-lg btn-block"
                onClick={this.toggleModal.bind(this)}
              >
                {" "}
                <i className="icofont-user-alt-5" /> User Registration
              </Link>
              <br />
              <Link
                to={"/registerdriver"}
                className="btn btn-primary btn-lg btn-block"
                onClick={this.toggleModal.bind(this)}
              >
                {" "}
                <i className="icofont-car" /> Driver Registration
              </Link>
            </ModalBody>
            <ModalFooter className="justify-content-start">
              <small
                id="emailHelp"
                className="form-text text-muted text-center"
              >
                By signing up, you agree to our Terms, Data Policy and Cookies
                Policy.
              </small>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalIsOpen2} centered>
            <ModalHeader toggle={this.toggleModal2.bind(this)}>
              <h4>
                <i className="icofont-login" /> Sign In
              </h4>
            </ModalHeader>
            <ModalBody>
              <h5>Sign in to your account.</h5>
              <p>
                If you have an account, sign in with your email address and
                password.
              </p>
              <Link
                to={"/loginuser"}
                className="btn btn-primary btn-lg btn-block"
                onClick={this.toggleModal2.bind(this)}
              >
                {" "}
                <i className="icofont-user-alt-5" /> User Login
              </Link>
              <br />
              <Link
                to={"/logindriver"}
                className="btn btn-primary btn-lg btn-block"
                onClick={this.toggleModal2.bind(this)}
              >
                {" "}
                <i className="icofont-car" /> Driver Login
              </Link>
            </ModalBody>
            <ModalFooter />
          </Modal>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withRouter(Navbar));
