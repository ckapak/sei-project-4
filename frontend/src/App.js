import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import ReactDOM from 'react-dom'
import '../src/stylesheets/main.scss'
import 'bulma'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'
import All from './components/places/PlaceAll'
import Filtered from './components/places/PlaceIndex'
import Show from './components/places/PlaceShow'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import New from './components/places/PlaceCreate'

const App = () => (
  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/places/search" component={Filtered} />
        <SecureRoute path="/places/new" component={New} />
        <Route path="/places" component={All} />
        <Route path="/place/:id" component={Show} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </main>
  </BrowserRouter>
)

export default App
