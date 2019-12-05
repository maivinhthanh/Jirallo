import './App.css';
import React from 'react';
import UserPage from './Page/UserPage';
import HomePage from './Page/HomePage'
import MainPage from './Page/MainPage'
import { DndProvider } from 'react-dnd'
import BoardPage from './Page/BoardPage'
import AdminPage from './Page/AdminPage';
import Group from './Components/Group/Group';
import BacklogPage from './Page/BacklogPage';
import DetailUserPage from './Page/DetailUserPage'
import ProfileProject from './Page/ProfileProject'
import HTML5Backend from 'react-dnd-html5-backend'
import ListProjectPage from './Page/ListProjectPage'
import Login from './Containers/Auth/Login/LoginContainer'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './Containers/Auth/Register/RegisterContainer'
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Router>
          <Route path="/" exact component={HomePage} />
          <Route path="/user" component={UserPage} />
          <Route path="/backlog/:id?" component={BacklogPage} />
          <Route path="/Profile/:id?" component={ProfileProject} />
          <Route path="/board/:id?" component={BoardPage} />
          <Route path="/login" component={Login} />
          <Route path='/group' component={Group} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/detailUser" component={DetailUserPage} />
          <Route path="/viewAll" component={ListProjectPage} />
          <Route path="/adminPage" component={MainPage} />
        </Router>

      </div>
    </DndProvider>
  );
}

export default App;
