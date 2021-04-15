import React from "react";
import styled from "styled-components";
import image1 from "../Images/LogoMakr-7JfYUC.png";

const StyledDiv = styled.div`
  text-align: center;
  color: white;
  background-color: black;
  height: 225px;
  padding-top: 2rem;
  margin-top: 10rem;
`;

const Footer = () => {
  return (
    <footer>
      <StyledDiv>
        <p> &copy; 2021 IMONLINE </p>
        <img src={image1} alt={image1} />
      </StyledDiv>
    </footer>
  );
};
export default Footer;
