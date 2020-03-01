import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'

class NavBar extends React.Component {
  state = { navOpen: false }

  toggleNavbar = () => {
    this.setState({ navOpen: !this.state.navOpen })
  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navOpen: false })
    }
  }

  render() {
    return (
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">A Quiet Place to Be</Link>
            
            <a href="/#"
              className={`navbar-burger ${this.state.navOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link className="navbar-item" to="/places">See all places</Link>
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Signup</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/places/new">Add a new place</Link>}
              {Auth.isAuthenticated() && <a href="/#" onClick={this.handleLogout} className="navbar-item">Logout</a>}
            </div>
          </div>
        </div>
      </nav> 
    )
  }
}

export default withRouter(NavBar)