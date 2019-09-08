import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
class router extends Component {
  render() {
    return (
      <div>
      <Router>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
      </Router>
      </div>
    )
  }
}
export default router
