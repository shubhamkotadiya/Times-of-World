
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        
        <Switch>
          <Route exact path="/"><News key="general" pagesize= '6' country="in" categories="general"  /></Route>
          <Route exact path="/business"><News key="business" pagesize= '6' country="in" categories="business" /></Route>
          <Route exact path="/entertainment"><News key="entertaiment" pagesize= '6' country="in" categories="entertainment" /></Route>
          <Route exact path="/health"><News key="health" pagesize= '6' country="in" categories="health" /></Route>
          <Route exact path="/science"><News key="science" pagesize= '6' country="in" categories="science" /></Route>
          <Route exact path="/sports"><News key="sports" pagesize= '6' country="in" categories="sports" /></Route>
          <Route exact path="/technology"><News key="technology" pagesize= '6' country="in" categories="technology" /></Route>
        </Switch>
        </Router>
      </div>
    )
  }
}

