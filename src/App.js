import classes from './App.module.css';
import React, { Component } from 'react'

import HomePage from "./Components/HomePage/HomePage"
import TopBar from './Components/TopBar/TopBar';

import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import PlayerPage from './Components/PlayerPage/PlayerPage';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopBar />
          <Switch>

            {/* <HomePage /> */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/PlayerPage/:vId" component={PlayerPage} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App



