import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import UserRegister from "./Components/UserRegister";
import UserLogin from "./Components/UserLogin";
import UserCreateProfile from './Components/UserCreateProfile';
import Home from './Components/Home';
import CreatePost from './Components/CreatePost';
import FindFriends from './Components/FindFriends';
import UserProfile from './Components/userProfile';
import GetPosts from './Components/GetPosts';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <body>
        <Switch>
          <Route path='/userprofile:id'>
            <UserProfile/>
          </Route>
          <Route path='/findfriends'>
            <FindFriends/>
          </Route>
          <Route path='/createpost'>
            <CreatePost/>
          </Route>
          <Route path='/home'>
            <Home/>
            <GetPosts/>
          </Route>
          <Route path="/createprofile">
            <UserCreateProfile/>
          </Route>
          <Route path="/login">
            <UserLogin />
          </Route>
          <Route path="/">
            <UserRegister />
          </Route>
        </Switch>
      </body>
    </div>
  );
}

export default App;
