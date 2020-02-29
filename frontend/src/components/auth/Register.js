import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  state = {
    data: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value } // * make a copy of the data object in state, and update the field that the user is typing in, we identify this from the name attribute of the input (e.target.name)
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors }) // * set the new data object into state to replace the old one
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      await axios.post('/api/register', this.state.data)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }
  
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter card">
              <h2 className="title">Register</h2>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.username} ? : 'is-danger' : '' `}
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.username && <small className="help is-danger">{this.state.errors.username.message}</small>}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.email} ? : 'is-danger' : '' `}
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.email && <small className="help is-danger">{this.state.errors.email.message}</small>}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.password} ? : 'is-danger' : '' `}
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password && <small className="help is-danger">{this.state.errors.password.message}</small>}
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.passwordConfirmation} ? : 'is-danger' : '' `}
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Password Confirmation"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation.message}</small>}
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-warning is-fullwidth">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register