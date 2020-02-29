import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import ReactDOM from 'react-dom'
import '../src/stylesheets/main.scss'
import 'bulma'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import All from './components/places/PlaceAll'
import Filtered from './components/places/PlaceIndex'
import Show from './components/places/PlaceShow'

const App = () => (
  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/places/search" component={Filtered} />
        <Route path="/places" component={All} />
        <Route path="/place/:id" component={Show} />
      </Switch>
    </main>
  </BrowserRouter>
)

export default App
