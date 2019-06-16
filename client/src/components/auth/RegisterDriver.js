import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerDriver } from '../../actions/authActions';

class RegisterDriver extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
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
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerDriver(newDriver, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
        <div class="card-body">
        <div className="register">
        <br />
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your <span className="text-primary"><i className="icofont-car"/> driver</span> account.</p>
                  <hr />
                  <br />
                  <form onSubmit={this.onSubmit}>
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
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Kode Plat Nomor"
                        name="kode_plat_nomor"
                        value={this.state.kode_plat_nomor}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                    <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Trayek</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01">
                            <option selected>Choose...</option>
                            <option value="1">Pall 2 - Politeknik</option>
                            <option value="2">Pall 2 - Lapangan</option>
                        </select>
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
                      <small id="passwordHelpInline" class="text-info">
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
                    <button type="button" className="btn btn-primary btn-lg btn-block mt-4">Sign Up</button>
                  </form>
                  <br />
                  <p className="lead text-center"><h6>By signing up, you agree to our <span className="font-italic">Terms, Data Policy</span> and<span className="font-italic"> Cookies Policy</span>.</h6></p>
                </div>
              </div>
            </div>
            <br /><br /><br />
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
})

export default connect(mapStateToProps, { registerDriver })(withRouter(RegisterDriver));