import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from './Page/HomePage'
import BoardPage from './Page/BoardPage'
import Login from './Components/Login'
import Register from './Components/Register'
import Detail from './Components/DetailTask/Detail';
function App() {
  return (
    <div className="App">
      <Router>
              <Route path="/" exact component={HomePage} />
              <Route path="/board" component={BoardPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register}/>
              <Route path="/detail" component={Detail} />
      </Router>
    </div>
  );
}

export default App;
