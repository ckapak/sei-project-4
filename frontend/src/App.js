import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import ReactDOM from 'react-dom'
import '../src/stylesheets/main.scss'
import 'bulma'

import Home from './components/Home'
import Navbar from './components/Navbar'
import All from './components/PlacesAll'

const App = () => (
  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/places" component={All} />
      </Switch>
    </main>
  </BrowserRouter>
)

export default App
