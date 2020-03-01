import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class NavBar extends React.Component {

  render() {
    return (
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">A Quiet Place to Be</Link>
            <Link className="navbar-item" to="/places">See all places</Link>
            <Link className="navbar-item" to="/register">Signup</Link>
            <Link className="navbar-item" to="/login">Login</Link>
          </div>
        </div>
      </nav> 
    )
  }
}

export default withRouter(NavBar)