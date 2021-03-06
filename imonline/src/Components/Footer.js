import React from "react";
import styled from "styled-components";
import image1 from "../Images/LogoMakr-7JfYUC.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const StyledDiv = styled.div`
  text-align: center;
  color: white;
  background-color: black;
  padding-top: 2rem;
  margin-top: 10rem;

  p {
    font-size: 1.2rem;
  }
  .links {
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 2rem;
  }
  .links a {
    text-decoration: none;
    color: white;
  }
`;

const Footer = (props) => {
  return (
    <footer>
      {props.loggedIn === true ? (
        <StyledDiv>
          <p> &copy; 2021 IMONLINE </p>
          <p>All rights reserved</p>
          <img src={image1} alt={image1} />
          <div className="links">
            <Link to="/home">Home</Link>
            <Link to="/createpost">Create Post</Link>
            <Link to="/myprofile">My Profile</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </StyledDiv>
      ) : (
        <StyledDiv>
          <p> &copy; 2021 IMONLINE </p>
          <p>All rights reserved</p>
          <img src={image1} alt={image1} />
        </StyledDiv>
      )}
    </footer>
  );
};
const mapStateToProps = (state) => {
  return {
    loggedIn: state.sign.loggedIn,
  };
};

export default connect(mapStateToProps)(Footer);
