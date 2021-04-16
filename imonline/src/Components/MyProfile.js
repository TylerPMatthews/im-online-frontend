import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import IconButton from "@material-ui/core/IconButton";
import UpdateRoundedIcon from "@material-ui/icons/UpdateRounded";

//Styles
const StyledDiv = styled.div`
  text-align: center;
  .heading h3 {
    font-size: 1.2rem;
  }
  .information {
    margin: 5rem;
  }
  .information h4 {
    color: red;
  }
  .btmbottom {
    margin: 3rem;
  }
`;

const MyProfile = () => {
  //push to new page
  const { push } = useHistory();
  const toInfo = () => {
    //push to update info page
    push("/updateinformation");
  };

  return (
    <StyledDiv>
      <div className="heading">
        <h3>Would you like to update?</h3>
      </div>

      <div className="information">
        <h4>User Information</h4>
        <IconButton onClick={toInfo} variant="outlined">
          Update <UpdateRoundedIcon />
        </IconButton>
      </div>

      <div className="btmbottom">
        <IconButton
          onClick={() => {
            push("/home");
          }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
      </div>
    </StyledDiv>
  );
};
export default MyProfile;
