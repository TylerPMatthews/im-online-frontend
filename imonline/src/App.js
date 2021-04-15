import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import UserRegister from "./Components/UserRegister";
import UserLogin from "./Components/UserLogin";
import UserCreateProfile from "./Components/UserCreateProfile";
import Home from "./Components/Home";
import CreatePost from "./Components/CreatePost";
import GetPosts from "./Components/GetPosts";
import Comments from "./Components/comments";
import Nav from "./Components/Nav";
import MyProfile from "./Components/MyProfile";
import UpdateInformation from "./Components/UpdateInformation";
import UpdateProfile from "./Components/UpdateProfile";
import Footer from "./Components/Footer";
import Logout from "./Components/Logout";
function App() {
  return (
    <div className="App">
      <Nav />
      <body>
        <Switch>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/updateprofile">
            <UpdateProfile />
          </Route>
          <Route path="/updateinformation">
            <UpdateInformation />
          </Route>
          <Route path="/myprofile">
            <MyProfile />
          </Route>
          <Route path="/comments:id">
            <Comments />
          </Route>
          <Route path="/createpost">
            <CreatePost />
          </Route>
          <Route path="/home">
            <Home />
            <GetPosts />
          </Route>
          <Route path="/createprofile">
            <UserCreateProfile />
          </Route>
          <Route path="/login">
            <UserLogin />
          </Route>
          <Route path="/">
            <UserRegister />
          </Route>
        </Switch>
      </body>
      <Footer />
    </div>
  );
}

export default App;
