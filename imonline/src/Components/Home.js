import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

//Styles
const StyledDiv = styled.div`
  text-align: center;

  h2 {
    color: black;
  }
  h3 {
    color: black;
  }

  .postwrap a {
    color: white;
    background-color: black;
    padding: 0.5rem;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
  }
  .greeting span {
    color: red;
    padding: 2%;
  }
`;

const Home = (props) => {
  return (
    <StyledDiv>
      <div className="greeting">
        <h2>
          Welcome , <span>{props.user_username}</span>
        </h2>
      </div>
      <div className="postwrap">
        <h3>Would you like to create a new post?</h3>
        <Link to="/createpost">Create new post</Link>
      </div>
    </StyledDiv>
  );
};
const mapStateToProps = (state) => {
  return {
    user_username: state.user.user_username,
    user_id: state.user.user_id,
  };
};

export default connect(mapStateToProps)(Home);
