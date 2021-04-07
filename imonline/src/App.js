import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import UserRegister from "./Components/UserRegister";
import UserLogin from './Components/UserLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <body>
        <Switch>
          <Route path="/login">
            <UserLogin/>
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
