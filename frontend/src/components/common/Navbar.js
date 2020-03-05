import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import logo from '../../assets/logo-via-logohub2.png'

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
      <nav className="navbar is-info">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
            <img src={logo} alt={logo} />
            </Link>
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
            <Link className="navbar-item is-family-code" to="/maps">HiveMap</Link>
              <Link className="navbar-item is-family-code" to="/places">HiveList</Link>
              {!Auth.isAuthenticated() && <Link className="navbar-item is-family-code" to="/register">Signup</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item is-family-code" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item is-family-code" to="/places/new">Add to the Hive</Link>}
              {Auth.isAuthenticated() && <a href="/#" onClick={this.handleLogout} className="navbar-item">Logout</a>}
            </div>
          </div>
        </div>
      </nav> 
    )
  }
}

export default withRouter(NavBar)