import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { connect } from "react-redux";

//Styles
const StyledDiv = styled.nav`
  background-color: black;
  padding: 3%;
  display: flex;
  justify-content: space-evenly;

  a {
    text-decoration: none;
    color: white;
    font-size: 1.1rem;
  }
`;

const Nav = (props) => {
  return (
    <header>
      {props.loggedIn === true ? (
        <StyledDiv>
          <Link to="/home">
            <HomeRoundedIcon />
          </Link>
          <Link to="/createpost">
            <AddRoundedIcon />
          </Link>
          <Link to="myprofile">
            <AccountCircleRoundedIcon />
          </Link>
          <Link to="/logout">
            <ExitToAppRoundedIcon />
          </Link>
        </StyledDiv>
      ) : (
        <StyledDiv>
          <Link to="/login">Login</Link> <Link to="/register">Register</Link>
        </StyledDiv>
      )}
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    loggedIn: state.sign.loggedIn,
  };
};

export default connect(mapStateToProps)(Nav);
