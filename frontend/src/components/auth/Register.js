import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  state = {
    data: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    errors: {}
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
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
      <section className="is-dark is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">

          <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter">
              <h2 className="title is-1 has-text-warning has-text-centered">Register</h2>
                <div className="notification is-light">
                  <div className="field">
                    {/* <label className="label">Username</label> */}
                    <div className="control">
                      <input
                        className={`input ${this.state.errors.username} ? : 'is-danger' : '' `}
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                  </div>
                  <div className="field">
                    {/* <label className="label">Email</label> */}
                    <div className="control">
                      <input
                        className={`input ${this.state.errors.email} ? : 'is-danger' : '' `}
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
                  </div>
                  <div className="field">
                    {/* <label className="label">Password</label> */}
                    <div className="control">
                      <input
                        className={`input ${this.state.errors.password} ? : 'is-danger' : '' `}
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                  </div>
                  <div className="field">
                    {/* <label className="label">Password Confirmation</label> */}
                    <div className="control">
                      <input
                        className={`input ${this.state.errors.password_confirmation} ? : 'is-danger' : '' `}
                        name="password_confirmation"
                        type="password"
                        placeholder="Password Confirmation"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.errors.password_confirmation && <small className="help is-danger">{this.state.errors.password_confirmation}</small>}
                  </div>
                  <div className="field">
                    <div className="control">
                      <button type="submit" className="button is-info is-rounded is-outlined is-medium is-fullwidth">Register</button>
                    </div>
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