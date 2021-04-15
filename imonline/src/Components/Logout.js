import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setLoggedOut } from "../Actions/logoutActions";

const StyledDiv = styled.div`
  text-align: center;
  .thanks {
    margin: 3rem;
  }
  .thanks span {
    color: red;
  }
  .logout {
    padding-top: 1rem;
  }
  .creator{
    padding-top:1.5rem;
  }
  .frontend{
    padding-top:1.5rem;
  }
  .backend{
    padding-top:1.5rem;
  }
`;

const Logout = (props) => {
  const history = useHistory();
  const { push } = useHistory();
  const logoutUser = () => {
    props.setLoggedOut();
    localStorage.removeItem("token");
    push("/login");
  };
  return (
    <StyledDiv>
      <div className="thanks">
        <h3>
          Thank you for choosing <span>IMONLINE</span>
        </h3>
      </div>
      <div className="logout">
        <h3>Are you sure you want to logout?</h3>
        <Button variant="outlined" onClick={logoutUser}>
          Yes
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            history.goBack();
          }}
        >
          No
        </Button>
      </div>
      <div className='creator'>
          <h4>Creator</h4>
          <a target='#blank' href='https://github.com/TylerPMatthews'>Github Profile</a>

      </div>
      <div className='frontend'>
        <h4>Project Front-End code</h4>
        <a href='https://github.com/TylerPMatthews/im-online-frontend' target='#blank'>Github Code</a>
      </div>
      <div className='backend'>
      <h4>Project back-End code</h4>
        <a href='https://github.com/TylerPMatthews/im-online-backend' target='#blank'>Github Code</a>
      </div>
    </StyledDiv>
  );
};
const mapStateToProps = (state) => {
  return {
    loggedIn: state.sign.loggedIn,
  };
};

export default connect(mapStateToProps, { setLoggedOut })(Logout);
