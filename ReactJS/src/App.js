import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from './Page/HomePage'
import BoardPage from './Page/BoardPage'
import Login from './Containers/Auth/Login/LoginContainer'
import Group from './Components/Group/Group';
import Register from './Containers/Auth/Register/RegisterContainer'
import AdminPage from './Page/AdminPage';
function App() {
  return (
    <div className="App">
      <Router>
              <Route path="/" exact component={HomePage} />
              <Route path="/board" component={BoardPage} />
              <Route path="/login" component={Login} />
              <Route path='/group' component={Group} />
              <Route path="/register" component={Register}/>
              <Route path="/admin" component={AdminPage} />
      </Router>
    </div>
  );
}

export default App;
