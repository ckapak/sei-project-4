import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { headers } from '../../lib/headers'
// import notification from '../../lib/notification'

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()

    let res

    try {
      res = await axios.post('/api/login', this.state.data, headers)
    } catch (err) {
      this.setState({ error: 'Incorrect Credentials' })
      return
    }

    Auth.setToken(res.data.token)
    // notification(res.data.message)
    this.props.history.push('/places')
  }

  render() {
    return (
      <section className="is-dark is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
          <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter">
              <h2 className="title is-1 has-text-warning has-text-centered">Login</h2>
              <div className="notification is-light">
                <div className="field">
                  {/* <label className="label">Email</label> */}
                  <div className="control">
                    <input
                      className={`input ${this.state.error} ? : 'is-danger' : '' `}
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  {/* <label className="label">Password</label> */}
                  <div className="control">
                    <input
                      className={`input ${this.state.error} ? : 'is-danger' : '' `}
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}
                </div>
                <button type="submit" className="button is-info is-rounded is-outlined is-medium">Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Login