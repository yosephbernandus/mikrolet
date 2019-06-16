import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      showPassword : false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
  }

  render() {
    return (
      <div class="card-body">
        <div className="login">
        <br />
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign In</h1>
                  <p className="lead text-center">Sign in to your<span className="text-primary"> <i className="icofont-user-alt-5"/> user</span> account.</p>
                  <hr />
                  <br />
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label htmlFor="email">Email address</label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                      <input
                        type={this.state.showPassword ? 'text' : 'password'}
                        className="form-control form-control-lg"
                        placeholder="Enter Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="custom-control custom-checkbox my-1 mr-sm-2">
                      <input type="checkbox" class="custom-control-input" id="customControlInline" checked={this.state.showPassword} onChange={() => this.setState({ showPassword: !this.state.showPassword })} />
                      <label class="custom-control-label" for="customControlInline">Show Password</label>
                    </div>
                    <button type="button" className="btn btn-primary btn-lg btn-block mt-4">Sign In</button>
                  </form>
                  <br />
                  <p className="lead text-center"><h6>Don't have an account? <Link className="font-weight-normal" to="/register">Sign Up</Link></h6></p>
                </div>
              </div>
            </div>
            <br /><br /><br />
          </div>
        </div>
    );
  }
}

export default LoginUser;