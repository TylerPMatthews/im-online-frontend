import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";


const StyledDiv = styled.div`
text-align:center;
a{
  color:white;
  
}
h2{
  color:red;
}
h3{
  color:red;
}

.postwrap a{
  color:black;
  background-color:white;
  padding:0.5rem;
  text-decoration:none;
  border-radius:5px;
  font-size:1rem;
}
.greeting span{
  color:white;
  padding:2%;
}
`;

const Home = (props) => {
  return (
    <StyledDiv>
      <div className="greeting">
        <h2>Welcome , <span>{props.user_username}</span></h2>
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
