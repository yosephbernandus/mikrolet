import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/user");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div class="card-body">
        <div className="login">
          <br />
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your
                  <span className="text-primary">
                    {" "}
                    <i className="icofont-user-alt-5" /> user
                  </span>{" "}
                  account.
                </p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type={this.state.showPassword ? "text" : "password"}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Enter Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div class="custom-control custom-checkbox my-1 mr-sm-2">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customControlInline"
                      checked={this.state.showPassword}
                      onChange={() =>
                        this.setState({
                          showPassword: !this.state.showPassword
                        })
                      }
                    />
                    <label
                      class="custom-control-label"
                      for="customControlInline"
                    >
                      Show Password
                    </label>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
                <br />
                <p className="lead text-center">
                  <h6>
                    Don't have an account?{" "}
                    <Link className="font-weight-normal" to="/registeruser">
                      Sign Up
                    </Link>
                  </h6>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginUser.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(LoginUser);
