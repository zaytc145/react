import React from "react";
import auth from "./auth";
import history from './routes/history';
import { Redirect, Link } from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false
  };

  submitForm = async e => {
    e.preventDefault();
    let inputData = this.state
    this.setState({ loading: true });
    try {
      await auth.login(inputData);
      this.setState({ loading: false });
      history.push('/')
    } catch (error) {
      this.setState({ loading: false });
      alert(error)
    }
  };

  render() {
    if(!auth.getAuthStatus()){
      return (
        <div className="login-form">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Login Form</h2>
            </div>
            <form>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  required
                ></input>
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  required
                ></input>
              </div>
              <button
                type="submit"
                onClick={this.submitForm}
              >
                {this.state.loading ? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true" style={{zIndex:"0"}}></i> : "Submit"}
              </button>
              <Link to='#'>Forget password?</Link>
            </form>
          </div>
        </div>
      );
    }else{
      return(
        <Redirect
        to={{
          pathname: "/",
          state: {
            from: this.props.location
          }
        }}
      />
      )
    }
  }
}

export default Login;
