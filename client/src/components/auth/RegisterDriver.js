import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerDriver} from "../../actions/authActions";

class RegisterDriver extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      kode_plat_nomor: "",
      trayek:"",
      password: "",
      password2: "",
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newDriver = {
      name: this.state.name,
      email: this.state.email,
      kode_plat_nomor: this.state.kode_plat_nomor,
      trayek: this.state.trayek,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerDriver(newDriver, this.props.history);
  }

  render() {
    const { errors } = this.state;
    // const { user } = this.props.auth;

    return (
      <div className="card-body">
        <div className="register">
          <br />
          {/* {user ? user.name : null} */}
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your
                  <span className="text-primary">
                    {" "}
                    <i className="icofont-car" /> driver
                  </span>{" "}
                  account.
                </p>
                <hr />
                <br />
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
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
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.kode_plat_nomor
                      })}
                      placeholder="Kode Plat Nomor"
                      name="kode_plat_nomor"
                      value={this.state.kode_plat_nomor}
                      onChange={this.onChange}
                    />
                    {errors.kode_plat_nomor && (
                      <div className="invalid-feedback">{errors.kode_plat_nomor}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-lg">
                      <div className="input-group-prepend">
                        <label
                          className="input-group-text"
                          for="inputGroupSelect01"
                        >
                          Trayek
                        </label>
                      </div>
                      <select 
                        type="text"
                        className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.trayek
                        })}
                        name="trayek"
                        value={this.state.trayek}
                        onChange={this.onChange}
                        >
                        <option selected>Choose...</option>
                        <option>Pall 2 - Politeknik</option>
                        <option>Pall 2 - Lapangan</option>
                        <option>Pall 2 - Kairagi</option>
                        <option>Pall 2 - 45</option>
                      </select>
                      {errors.trayek && (
                      <div className="invalid-feedback">{errors.trayek}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                    <small id="passwordHelpInline" className="text-info">
                      Must be 6-30 characters long.
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password2
                      })}
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">{errors.password2}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
                <br />
                <p className="lead text-center">
                  <h6>
                    By signing up, you agree to our{" "}
                    <span className="font-italic">Terms, Data Policy</span> and
                    <span className="font-italic"> Cookies Policy</span>.
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

RegisterDriver.propTypes = {
  registerDriver: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerDriver }
)(withRouter(RegisterDriver));
