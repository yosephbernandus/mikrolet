import React, { Component } from 'react';

class RegisterUser extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerDriver(newUser, this.props.history);
  }

  render() {
    return (
        <div class="card-body">
        <div className="register">
        <br />
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your<span className="text-primary"> <i className="icofont-user-alt-5"/> user</span> account.</p>
                  <hr />
                  <br />
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      <small id="passwordHelpInline" class="text-info">
                        Must be 6-30 characters long.
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                      />
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

export default RegisterUser;