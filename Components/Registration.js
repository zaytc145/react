import React from "react";
import auth from "./auth";
import { Redirect } from "react-router-dom";
import history from './routes/history';

class Registration extends React.Component {
  state = {
    email: "",
    login: "",
    password: "",
    secondPassword: "",
    loading:false
  };

  submitForm = async e => {
    e.preventDefault();
    let inputData = this.state
    this.setState({ loading: true });
    try {
      await auth.signup(inputData);
      this.setState({ loading: false });
      history.push('/')
    } catch (error) {
      this.setState({ loading: false });
      console.log(error)
    }
  };

  render() {
    if (!auth.getAuthStatus()) {
      return (
        <div className="registration-form">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Registration Form</h2>
            </div>
            <form>
              <div className="field">
                <label>Email</label>
                <input
                  autoComplete="off"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                ></input>
              </div>
              <div className="field">
                <label>Login</label>
                <input
                  autoComplete="off"
                  type="login"
                  name="login"
                  value={this.state.login}
                  onChange={e => this.setState({ login: e.target.value })}
                ></input>
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  autoComplete="off"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                ></input>
              </div>
              <div className="field">
                <label>Repeat Password</label>
                <input
                  type="password"
                  name="repeat password"
                  value={this.state.secondPassword}
                  onChange={e => this.setState({ secondPassword: e.target.value })}
                ></input>
              </div>
              <button
                className="ui button"
                type="submit"
                onClick={this.submitForm}
              >
              {this.state.loading ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              from: this.props.location
            }
          }}
        />
      );
    }
  }
}

export default Registration;
