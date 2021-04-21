import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useHistory } from "react-router-dom";

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
//Push to home
const Home = (props) => {
  const { push } = useHistory();
  const pushnewPost = () => {
    push("/createpost");
  };

  //make username always display uppercase
  const upper = props.user_username.toUpperCase();

  return (
    <StyledDiv>
      <div className="greeting">
        <h2>
          WELCOME , <span>{upper}</span>
        </h2>
      </div>
      <div className="postwrap">
        <h3>Would you like to create a new post?</h3>
        <IconButton onClick={pushnewPost}>
          <AddRoundedIcon />
        </IconButton>
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
