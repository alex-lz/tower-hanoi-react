import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Hanoi from './Hanoi';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/hanoi' exact={true} component={Hanoi}/>
        </Switch>
      </Router>
    )
  }
}

export default App;